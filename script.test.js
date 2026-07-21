const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const scriptSource = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

class MockElement {
    constructor(tagName, id = null) {
        this.tagName = tagName.toUpperCase();
        this.id = id;
        this.value = '';
        this.children = [];
        this.listeners = {};
        this._innerHTML = '';
        this.focused = false;
    }

    appendChild(child) {
        this.children.push(child);
        return child;
    }

    addEventListener(type, handler) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(handler);
    }

    click() {
        this.dispatchEvent('click');
    }

    dispatchEvent(type, event = {}) {
        (this.listeners[type] || []).forEach((handler) => handler({ target: this, ...event }));
    }

    focus() {
        this.focused = true;
    }

    set innerHTML(value) {
        this._innerHTML = value;
        this.children = [];
    }

    get innerHTML() {
        return this._innerHTML;
    }
}

class MockDocument {
    constructor() {
        this.nodesById = new Map();
    }

    registerElement(element) {
        if (element.id) {
            this.nodesById.set(element.id, element);
        }
        return element;
    }

    getElementById(id) {
        return this.nodesById.get(id);
    }
}

function setup() {
    const document = new MockDocument();
    const qrInput = document.registerElement(new MockElement('input', 'qrInput'));
    const qrOutput = document.registerElement(new MockElement('div', 'qrOutput'));
    const createBtn = document.registerElement(new MockElement('button', 'createBtn'));

    const alerts = [];
    const errors = [];
    const qrCalls = [];

    function QRCode(container, options) {
        qrCalls.push({ container, options });
        container.appendChild(new MockElement('canvas'));
    }

    const context = {
        document,
        window: {},
        alert: (message) => alerts.push(message),
        console: { error: (err) => errors.push(err) },
        QRCode,
    };

    context.window.document = document;

    vm.createContext(context);
    vm.runInContext(scriptSource, context);

    const generateQR = context.window.generateQR;

    return { qrInput, qrOutput, createBtn, alerts, errors, qrCalls, generateQR };
}

test('generateQR alerts when no value is provided', () => {
    const env = setup();
    env.qrInput.value = '   ';

    env.generateQR();

    assert.deepEqual(env.alerts, ['Please enter some text or URL']);
    assert.equal(env.qrCalls.length, 0);
    assert.equal(env.qrOutput.innerHTML, '');
});

test('generateQR trims input and initializes QRCode', () => {
    const env = setup();
    env.qrInput.value = '  https://example.com  ';

    env.generateQR();

    assert.equal(env.alerts.length, 0);
    assert.equal(env.qrCalls.length, 1);
    assert.equal(env.qrCalls[0].options.text, 'https://example.com');
    assert.equal(env.qrCalls[0].options.width, 200);
    assert.equal(env.qrCalls[0].options.height, 200);
    assert.equal(env.qrOutput.children.length, 1);
});

test('clicking the button calls generateQR', () => {
    const env = setup();
    env.qrInput.value = 'value';

    env.createBtn.click();

    assert.equal(env.qrCalls.length, 1);
});
