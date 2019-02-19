'use strict';

/* eslint-env browser */

const LifeInWeeks = (() => class {
    constructor(config, el) {
        this.config = config;
        this.el = el;
        this.settings = {};
        this.entries = {};
    }

    load() {
        fetch(this.config)
            .then(response => response.text())
            .then((text) => {
                this.parse(text);
                this.render();
            });
    }

    parse(text) {
        if (text) {
            this.config = text;
        }

        const [settings, entries] = text.split('---\n');
        settings.split('\n').forEach((line) => {
            const [key, value] = line.split(/:\s*/);
            this.settings[key] = value;
        });
        this.entries = entries.split('\n').map(line => line.split(/\s*\|\s*/));
    }

    render() {
        this.el.innerHTML = this.settings.born + '<p>' + this.entries.join('<br>');
    }
})();
