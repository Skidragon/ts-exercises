type Filter<T> = (data: T) => boolean;
type Map<T> = (data: T) => Partial<T>;
type Processors<T> = {[Property in keyof T]: (Map | Filter)}
class EventProcessor<EventMap> {
  private processedEvents: EventMap[] = [];
  public processors: {
    [Property in keyof EventMap]: (Filter<EventMap[Property]|Map<EventMap[Property])[];
  } = {};
  handleEvent<Key extends keyof EventMap>(eventName: Key, data: EventMap[Key]): void {

  }

  addFilter<Key extends keyof EventMap>(
    eventName: Key,
    filter: Filter<EventMap[Key]>
  ): void {
    if(this.processors[eventName]) {
      this.processors[eventName].push(filter);
    } else {
      this.processors[eventName] = [filter]
    }
  }

  addMap<Key extends keyof EventMap>(eventName: Key, map: Map<EventMap[Key]>): void {
     if(this.processors[eventName]) {
      this.processors[eventName].push(map);
    } else {
      this.processors[eventName] = [map]
    }
  }

  getProcessedEvents() {
    console.table(JSON.stringify(this.processedEvents))
  }
}

interface EventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

const ep = new EventProcessor<EventMap>();
ep.processors
// class UserEventProcessor extends EventProcessor<EventMap> {}

// const uep = new UserEventProcessor();

// uep.addFilter("login", ({ user }) => Boolean(user));

// uep.addMap("login", (data) => ({
//   ...data,
//   hasSession: Boolean(data.user && data.name),
// }));

// uep.handleEvent("login", {
//   user: null,
//   name: "jack",
// });
// uep.handleEvent("login", {
//   user: "tom",
//   name: "tomas",
// });
// uep.handleEvent("logout", {
//   user: "tom",
// });

// console.log(uep.getProcessedEvents());

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