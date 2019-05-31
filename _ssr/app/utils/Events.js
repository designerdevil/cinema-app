const events = {
    events: {},
    subscribe(eventName, object, callback) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push({ object, callback });
    },
    unsubscribe(eventName, object, callback) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i].object === object) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    publish(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((instance) => {
                instance.callback(data);
            });
        }
    }
};

export default events;
