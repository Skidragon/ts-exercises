type Filter<T> = (data: T) => boolean;
type Map<T> = (data: T) => Partial<T>;
enum ProcessorTypes {
  map,
  filter
}
type Processor<Value> = { processor: Filter<Value>|Map<Value>; type: ProcessorTypes; };
class EventProcessor<EventMap> {
  //TODO: data needs to have the value of EventMap
  private processedEvents: { eventName: ProcessorTypes, data: any}[] = [];
  public processors = {} as {
    [Key in keyof EventMap]: Processor<EventMap[Key]>[];
  }
  handleEvent<Key extends keyof EventMap>(eventName: Key, data: EventMap[Key]): void {
    const event = {
      eventName,
      data
    }
    for(let { processor, type } of this.processors[eventName]) {
        if(type === ProcessorTypes.filter) {
          if(processor(data) === true) {
            continue;
          }
        }
        if(type === ProcessorTypes.map) {
          //TODO: Map the data
          processor(data);
          event.data = {
            ...event.data,
          }
        }
    }

  }

  addFilter<Key extends keyof EventMap>(
    eventName: Key,
    filter: Filter<EventMap[Key]>
  ): void {
    const processor = {
      type: ProcessorTypes.filter,
        processor: filter
    }
    if(this.processors[eventName]) {
      this.processors[eventName].push(processor);
    } else {
      this.processors[eventName] = [processor]
    }
  }

  addMap<Key extends keyof EventMap>(eventName: Key, map: Map<EventMap[Key]>): void {
    const processor = {
      type: ProcessorTypes.map,
      processor: map
    }
     if(this.processors[eventName]) {
      this.processors[eventName].push(processor);
    } else {
      this.processors[eventName] = [processor]
    }
  }

  getProcessedEvents() {
    return JSON.stringify(this.processedEvents);
  }
}

interface EventMap {
  //TODO: Make it work with user?: string
  login: { user?: string | null; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

const ep = new EventProcessor<EventMap>();
class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();

uep.addFilter("login", ({ user }) => Boolean(user));

uep.addMap("login", (data) => ({
  ...data,
  hasSession: Boolean(data.user && data.name),
}));

uep.handleEvent("login", {
  user: null,
  name: "jack",
});
uep.handleEvent("login", {
  user: "tom",
  name: "tomas",
});
uep.handleEvent("logout", {
  user: "tom",
});

console.table(uep.getProcessedEvents());

/*
Result:
[
  {
    eventName: 'login',
    data: { user: 'tom', name: 'tomas', hasSession: true }
  },
  { eventName: 'logout', data: { user: 'tom' } }
]
*/