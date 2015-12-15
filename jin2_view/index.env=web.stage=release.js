//dumb.js.map
;
function $jin2_error(info) {
    var error = new Error(info.reason);
    Object.defineProperty(error, 'message', {
        get: function () {
            return JSON.stringify(this.info);
        }
    });
    error['info'] = info;
    return error;
}
//error.js.map
;
function $jin2_object_path(obj) {
    var path = obj.objectPath;
    if (path)
        return path;
    if (typeof obj === 'function') {
        return obj.objectPath = obj.name || Function.toString.call(obj).match(/^\s*function\s*([$\w]*)\s*\(/)[1];
    }
    throw $jin2_error({ reason: 'Field not defined', field: 'objectPath' });
}
var $jin2_object = (function () {
    function $jin2_object(config) {
        if (config)
            this.objectAssign(config);
    }
    $jin2_object.prototype.destroy = function () {
        for (var key in this) {
            var val = this[key];
            if (!val)
                continue;
            if (val.objectOwner !== this)
                continue;
            val.destroy();
        }
        this.objectOwner = null;
    };
    $jin2_object.make = function (arg) {
        return new this(arg);
    };
    $jin2_object.toString = function () {
        return this.objectPath;
    };
    $jin2_object.prototype.toString = function () {
        return this.objectPath;
    };
    Object.defineProperty($jin2_object.prototype, "objectName", {
        get: function () {
            return this._objectName || (this._objectName = '_' + ++$jin2_object.seed);
        },
        set: function (next) {
            if (this._objectName !== void 0)
                throw $jin2_error({
                    reason: 'Property already defined',
                    path: this.objectPath + '.objectName',
                    next: next,
                    prev: this._objectName,
                });
            this._objectName = next;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty($jin2_object.prototype, "objectId", {
        get: function () {
            return (this._objectId === void 0) ? '' : this._objectId;
        },
        set: function (next) {
            if (this._objectId !== void 0)
                throw $jin2_error({
                    reason: 'Property already defined',
                    path: this.objectPath + '.objectId',
                    next: next,
                    prev: this._objectId,
                });
            this._objectId = next;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty($jin2_object.prototype, "objectPath", {
        get: function () {
            if (this._objectPath)
                return this._objectPath;
            var owner = this.objectOwner;
            return this._objectPath = $jin2_object_path(owner) + '.' + this.objectName + '_' + this.objectId;
        },
        set: function (next) {
            if (this._objectPath)
                throw $jin2_error({
                    reason: 'Property already defined',
                    path: this.objectPath + '.objectPath',
                    next: next,
                    prev: this._objectPath,
                });
            this._objectPath = next;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty($jin2_object.prototype, "objectOwner", {
        get: function () {
            if (this._objectOwner)
                return this._objectOwner;
            throw $jin2_error({
                reason: 'Property not defined',
                name: 'objectOwner',
            });
        },
        set: function (next) {
            var ownerField = this.objectName + '_' + this.objectId;
            if (next) {
                var prev = this._objectOwner;
                if (prev)
                    throw $jin2_error({
                        reason: 'Property already defined',
                        path: this.objectPath + '.objectOwner',
                        prev: prev,
                        next: next
                    });
                var nextVal = next[ownerField];
                if (nextVal === this)
                    return;
                if (nextVal)
                    throw $jin2_error({
                        reason: 'Property already defined',
                        path: next.objectPath + '.' + ownerField,
                        prev: nextVal,
                        next: this
                    });
                this._objectOwner = next;
                next[ownerField] = this;
            }
            else {
                var prev = this._objectOwner;
                if (!prev)
                    return;
                prev[ownerField] = null;
                this._objectOwner = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    $jin2_object.prototype.objectAssign = function (config) {
        for (var key in config) {
            if (config[key] === void 0)
                continue;
            this[key] = config[key];
        }
        return this;
    };
    $jin2_object.prototype.objectEquals = function (other) {
        return this === other;
    };
    $jin2_object.subClass = function (config) {
        var parent = this;
        var subClass = config.hasOwnProperty('constructor')
            ? config['constructor']
            : function () {
                parent.apply(this, arguments);
            };
        subClass.prototype = Object.create(this.prototype);
        subClass.prototype.constructor = subClass;
        for (var key in this) {
            if (this[key] === void 0)
                continue;
            subClass[key] = this[key];
        }
        subClass.prototype.objectAssign(config);
        return subClass;
    };
    $jin2_object.seed = 0;
    return $jin2_object;
})();
//object.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin2_prop = (function (_super) {
    __extends($jin2_prop, _super);
    function $jin2_prop(config) {
        _super.call(this, config);
    }
    Object.defineProperty($jin2_prop.prototype, "objectOwner", {
        get: function () {
            return this._objectOwner;
        },
        set: function (next) {
            this._objectOwner = next;
        },
        enumerable: true,
        configurable: true
    });
    $jin2_prop.prototype.pull_ = function (prev) {
        return prev;
    };
    $jin2_prop.prototype.put_ = function (next, prev) {
        throw $jin2_error({ reason: 'Read only' });
        return void 0;
    };
    $jin2_prop.prototype.get = function () {
        return this.pull_();
    };
    $jin2_prop.prototype.set = function (next, prev) {
        return this.put_(next, prev);
    };
    $jin2_prop.prototype.mutate = function (mutate) {
        var prev = this.get();
        var next = mutate.call(this.objectOwner, prev);
        return this.set(next, prev);
    };
    return $jin2_prop;
})($jin2_object);
//prop.js.map
;
var $jin2_state_stack = {};
//state.js.map
;
function $jin2_log() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i - 0] = arguments[_i];
    }
    if (typeof console === 'undefined')
        return;
    console.log(console, arguments);
    return arguments[0];
}
function $jin2_log_info(message) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    if (typeof console === 'undefined')
        return;
    if (!$jin2_log_filter.test(message))
        return;
    console.log(message, values);
}
function $jin2_log_warn(message) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    if (typeof console === 'undefined')
        return;
    if (!$jin2_log_filter.test(message))
        return;
    return console.warn.apply(console, arguments);
}
function $jin2_log_error(error) {
    if (typeof console === 'undefined')
        return;
    if (error.jin_log_isLogged)
        return;
    var message = error.stack || error;
    if (console['exception'])
        console['exception'](error);
    else if (console.error)
        console.error(message);
    else if (console.log)
        console.log(message);
    error.jin_log_isLogged = true;
}
function $jin2_log_error_ignore(error) {
    error.jin_log_isLogged = true;
    return error;
}
var $jin2_log_filter = /^$/;
//log.env=web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin2_atom = (function (_super) {
    __extends($jin2_atom, _super);
    function $jin2_atom(config) {
        _super.call(this, config);
        this.error = $jin2_atom.obsolete;
        this.mastersDeep = 0;
        this.slavesCount = 0;
    }
    $jin2_atom.prototype.get_ = function (value) { return value; };
    $jin2_atom.prototype.pull_ = function (prev) { return prev; };
    $jin2_atom.prototype.norm_ = function (next, prev) { return next; };
    $jin2_atom.prototype.put_ = function (next, prev) { return next; };
    $jin2_atom.prototype.fail_ = function (error) { return void 0; };
    $jin2_atom.prototype.reap_ = function () { return true; };
    $jin2_atom.prototype.reap = function () {
        $jin2_atom._planReap[this.objectPath] = null;
        if (this.slavesCount)
            return;
        if (this.reap_()) {
            this.destroy();
            return true;
        }
        return false;
    };
    $jin2_atom.prototype.destroy = function () {
        $jin2_atom._planReap[this.objectPath] = null;
        this.disobeyAll();
        _super.prototype.destroy.call(this);
    };
    $jin2_atom.prototype.touch = function () {
        var slave = $jin2_atom.stack[$jin2_atom.stack.length - 1];
        if (!slave)
            return;
        $jin2_atom.link(this, slave);
    };
    $jin2_atom.prototype.get = function () {
        this.touch();
        if (this.error === $jin2_atom.obsolete)
            this.pull();
        if (this.error)
            throw this.error;
        return this.get_(this.value_);
    };
    $jin2_atom.prototype.pull = function () {
        var oldMasters = this.masters;
        this.masters = null;
        this.mastersDeep = 0;
        this.error = $jin2_atom.wait;
        var index = $jin2_atom.stack.length;
        $jin2_atom.stack.push(this);
        var next = this.pull_(this.value_);
        $jin2_atom.stack.length = index;
        if (next !== void 0)
            this.push(next);
        if (oldMasters)
            for (var masterName in oldMasters) {
                var master = oldMasters[masterName];
                if (!master)
                    continue;
                if (this.masters && this.masters[masterName])
                    continue;
                master.dislead(this);
            }
        return this.value_;
    };
    $jin2_atom.prototype.push = function (next) {
        var prev = this.value_;
        next = this.norm_(next, prev);
        this.error = null;
        if (next !== prev) {
            this.value_ = next;
            this.notify(prev);
        }
        return next;
    };
    $jin2_atom.prototype.set = function (next, prev) {
        var value = this.value_;
        next = this.norm_(next, value);
        if (prev !== void 0)
            prev = this.norm_(prev, value);
        if (next !== value) {
            next = this.put_(next, prev);
            if (next !== void 0) {
                this.push(next);
            }
        }
        return this.value_;
    };
    $jin2_atom.prototype.clear = function () {
        var prev = this.value_;
        this.value_ = void 0;
        this.error = $jin2_atom.obsolete;
        this.notify(prev);
        return void 0;
    };
    $jin2_atom.prototype.notifySlaves = function () {
        if (this.slavesCount) {
            for (var slaveName in this.slaves) {
                var slave = this.slaves[slaveName];
                if (!slave)
                    continue;
                slave.update();
            }
        }
    };
    $jin2_atom.prototype.notify = function (prev) {
        $jin2_log_info(this.objectPath, this.value_, prev);
        this.notifySlaves();
    };
    $jin2_atom.prototype.fail = function (error) {
        this.error = error;
        this.notifySlaves();
        var value = this.fail_(error);
        if (value !== void 0)
            this.push(value);
    };
    $jin2_atom.prototype.update = function () {
        if (this.error === $jin2_atom.obsolete)
            return;
        this.error = $jin2_atom.obsolete;
        $jin2_atom.actualize(this);
    };
    $jin2_atom.prototype.lead = function (slave) {
        var slaveName = slave.objectPath;
        if (this.slaves) {
            if (this.slaves[slaveName])
                return false;
        }
        else {
            this.slaves = {};
        }
        this.slaves[slaveName] = slave;
        delete $jin2_atom._planReap[this.objectPath];
        this.slavesCount++;
        return true;
    };
    $jin2_atom.prototype.dislead = function (slave) {
        var slaveName = slave.objectPath;
        if (!this.slaves[slaveName])
            return;
        this.slaves[slaveName] = null;
        if (!--this.slavesCount) {
            $jin2_atom.collect(this);
        }
    };
    $jin2_atom.prototype.disleadAll = function () {
        if (!this.slavesCount)
            return;
        for (var slaveName in this.slaves) {
            var slave = this.slaves[slaveName];
            if (!slave)
                continue;
            slave.disobey(this);
        }
        this.slaves = null;
        this.slavesCount = 0;
        $jin2_atom.collect(this);
    };
    $jin2_atom.prototype.obey = function (master) {
        var masters = this.masters;
        if (!masters)
            masters = this.masters = {};
        var masterName = master.objectPath;
        if (masters[masterName])
            return false;
        masters[masterName] = master;
        var masterDeep = master.mastersDeep;
        if (this.mastersDeep <= masterDeep) {
            this.mastersDeep = masterDeep + 1;
        }
        return true;
    };
    $jin2_atom.prototype.disobey = function (master) {
        if (!this.masters)
            return;
        this.masters[master.objectPath] = null;
    };
    $jin2_atom.prototype.disobeyAll = function () {
        if (!this.mastersDeep)
            return;
        for (var masterName in this.masters) {
            var master = this.masters[masterName];
            if (!master)
                continue;
            master.dislead(this);
        }
        this.masters = null;
        this.mastersDeep = 0;
    };
    $jin2_atom.prototype.mutate = function (mutate) {
        var next = mutate.call(this.objectOwner, this.value_);
        return this.set(next);
    };
    $jin2_atom.prototype.on = function (notify, fail) {
        var _this = this;
        if (!notify)
            notify = function (value) { return null; };
        if (!fail)
            fail = function (error) { return (console.error(error), null); };
        var Listener = $jin2_atom.subClass({
            pull_: function (listener, prev) {
                listener.push(notify(_this.get()));
            },
            fail_: function (listener, error) {
                if (listener.error === $jin2_atom.wait)
                    return;
                listener.push(fail(listener.error));
            }
        });
        var listener = new Listener({});
        listener.update();
        return listener;
    };
    $jin2_atom.prototype.then = function (notify, fail) {
        var _this = this;
        if (!notify)
            notify = function (value) { return null; };
        if (!fail)
            fail = function (error) { return (console.error(error), null); };
        var promise = new $jin2_atom({
            pull_: function (prev) {
                try {
                    var val = _this.get();
                    promise.disobeyAll();
                    return notify(val);
                }
                catch (error) {
                    if (error === $jin2_atom.wait)
                        return;
                    throw error;
                }
            },
            fail_: function (error) {
                if (error === $jin2_atom.wait)
                    return void 0;
                promise.disobeyAll();
                return fail(error);
            },
        });
        promise.pull();
        return promise;
    };
    $jin2_atom.prototype.catch = function (fail) {
        return this.then(null, fail);
    };
    $jin2_atom.link = function (master, slave) {
        if (slave.obey(master)) {
            master.lead(slave);
        }
    };
    $jin2_atom.actualize = function (atom) {
        var deep = atom.mastersDeep;
        var plan = this._planPull;
        var level = plan[deep];
        if (!level)
            level = plan[deep] = [];
        level.push(atom);
        if (deep < this._minUpdateDeep)
            this._minUpdateDeep = deep;
        this.schedule();
    };
    $jin2_atom.collect = function (atom) {
        this._planReap[atom.objectPath] = atom;
        this.schedule();
    };
    $jin2_atom.schedule = function () {
        if (this._timer)
            return;
        this._timer = setTimeout(this.induce.bind(this), 0);
    };
    $jin2_atom.induce = function () {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
        this.schedule();
        while (true) {
            while (this._minUpdateDeep < this._planPull.length) {
                var level = this._planPull[this._minUpdateDeep++];
                if (!level)
                    continue;
                if (!level.length)
                    continue;
                var atom = level.shift();
                if (level.length)
                    this._minUpdateDeep--;
                if (atom.error !== this.obsolete)
                    continue;
                atom.pull();
            }
            var someReaped = false;
            for (var atomName in this._planReap) {
                var atom = this._planReap[atomName];
                if (!atom)
                    continue;
                someReaped = atom.reap();
            }
            if (!someReaped)
                break;
        }
        clearTimeout(this._timer);
        this._timer = null;
    };
    $jin2_atom.wait = new Error('Waiting for pulling...');
    $jin2_atom.obsolete = new Error('Obsolate state!');
    $jin2_atom.stack = $jin2_state_stack['$jin2_atom_stack'] = [];
    $jin2_atom._planPull = [];
    $jin2_atom._planReap = {};
    $jin2_atom._minUpdateDeep = 0;
    return $jin2_atom;
})($jin2_object);
var $jin2_atom_own = (function (_super) {
    __extends($jin2_atom_own, _super);
    function $jin2_atom_own() {
        _super.apply(this, arguments);
    }
    $jin2_atom_own.prototype.push = function (next) {
        var prev = this.value_;
        next = this.norm_(next, prev);
        this.error = null;
        if (next !== prev) {
            next.objectName = 'value';
            next.objectOwner = this;
            this.notify(prev);
        }
        return next;
    };
    return $jin2_atom_own;
})($jin2_atom);
var $jin2_atom_list = (function (_super) {
    __extends($jin2_atom_list, _super);
    function $jin2_atom_list() {
        _super.apply(this, arguments);
    }
    $jin2_atom_list.prototype.norm_ = function (next, prev) {
        if (!prev || !next)
            return next;
        if (next.length !== prev.length)
            return next;
        for (var i = 0; i < next.length; ++i) {
            if (next[i] === prev[i])
                continue;
            return next;
        }
        return prev;
    };
    return $jin2_atom_list;
})($jin2_atom);
window.addEventListener('error', function (event) {
    for (var _i = 0, _a = $jin2_atom.stack; _i < _a.length; _i++) {
        var atom = _a[_i];
        atom.fail(event['error']);
    }
    $jin2_atom.stack = [];
});
//atom.js.map
;
function $jin2_lazy(prototype, name, descr) {
    var prefix = name + '_';
    var getValue = function (id) {
        if (id === void 0) { id = ''; }
        var field = prefix + id;
        if (this[field])
            return this[field];
        var obj = makeValue.call(this, id);
        obj.objectAssign({
            objectName: name,
            objectId: id,
            objectOwner: this,
        });
        return obj;
    };
    if (descr.get) {
        var makeValue = descr.get;
        descr.get = getValue;
        descr.set = function (next) {
            if (typeof next === 'function') {
                makeValue = next;
            }
            else {
                this[prefix] = next;
            }
        };
    }
    else {
        var makeValue = descr.value;
        descr.value = getValue;
    }
}
//lazy.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $jin2_view = (function (_super) {
    __extends($jin2_view, _super);
    function $jin2_view() {
        _super.apply(this, arguments);
    }
    $jin2_view.prototype.tagName = function () {
        return new $jin2_prop({
            pull_: function () { return 'div'; }
        });
    };
    $jin2_view.prototype.nameSpace = function () {
        return new $jin2_prop({
            pull_: function () { return 'http://www.w3.org/1999/xhtml'; }
        });
    };
    $jin2_view.prototype.child = function () {
        return new $jin2_prop({
            pull_: function () { return null; }
        });
    };
    $jin2_view.prototype.attr = function () {
        return new $jin2_prop({
            pull_: function () { return ({}); }
        });
    };
    $jin2_view.prototype.field = function () {
        return new $jin2_prop({
            pull_: function () { return ({}); }
        });
    };
    $jin2_view.prototype.event = function () {
        return new $jin2_prop({
            pull_: function () { return ({}); }
        });
    };
    $jin2_view.prototype.pull_ = function (prev) {
        if (!prev) {
            var id = this.objectPath;
            prev = document.getElementById(id);
            if (!prev) {
                prev = document.createElementNS(this.nameSpace().get(), this.tagName().get());
                prev.setAttribute('id', id);
            }
            var router = (document.body === prev) ? document : prev;
            var events = this.event().get();
            for (var name in events)
                (function (name) {
                    var prop = events[name];
                    router.addEventListener(name, function (event) {
                        if (event.defaultPrevented)
                            return;
                        prop.set(event);
                        $jin2_atom.induce();
                    }, false);
                })(name);
            var proto1 = this.objectOwner;
            while (proto1 && (proto1 !== $jin2_view.prototype)) {
                var className = $jin2_object_path(proto1.constructor);
                if (!className)
                    continue;
                prev.setAttribute(className.replace(/\$/g, ''), this.objectName);
                proto1 = Object.getPrototypeOf(proto1);
            }
            var proto2 = this;
            while (proto2 && (proto2 !== $jin2_view.prototype)) {
                var className = $jin2_object_path(proto2.constructor);
                if (!className)
                    continue;
                prev.setAttribute(className.replace(/\$/g, ''), "");
                proto2 = Object.getPrototypeOf(proto2);
            }
        }
        var attrs = this.attr().get();
        for (var name in attrs) {
            var p = prev.getAttribute(name);
            var n = String(attrs[name].get());
            if (p !== n) {
                prev.setAttribute(name, n);
            }
        }
        var childs = this.child().get();
        if (childs) {
            var childViews = [].concat.apply([], childs);
            var childNodes = prev.childNodes;
            var nextNode = prev.firstChild;
            for (var i = 0; i < childViews.length; ++i) {
                var view = childViews[i];
                if (typeof view === 'object') {
                    if (view) {
                        var existsNode = view.get();
                        if (nextNode === existsNode) {
                            nextNode = nextNode.nextSibling;
                        }
                        else {
                            prev.insertBefore(existsNode, nextNode);
                        }
                    }
                }
                else {
                    if (nextNode && nextNode.nodeName === '#text') {
                        nextNode.nodeValue = String(view);
                        nextNode = nextNode.nextSibling;
                    }
                    else {
                        var textNode = document.createTextNode(String(view));
                        prev.insertBefore(textNode, nextNode);
                    }
                }
            }
            while (nextNode) {
                var currNode = nextNode;
                nextNode = currNode.nextSibling;
                prev.removeChild(currNode);
            }
        }
        var fields = this.field().get();
        for (var path in fields) {
            var names = path.split('.');
            var obj = prev;
            for (var i = 0; i < names.length - 1; ++i) {
                obj = obj[names[i]];
            }
            obj[names[names.length - 1]] = fields[path].get();
        }
        return prev;
    };
    __decorate([
        $jin2_lazy
    ], $jin2_view.prototype, "tagName", null);
    __decorate([
        $jin2_lazy
    ], $jin2_view.prototype, "nameSpace", null);
    __decorate([
        $jin2_lazy
    ], $jin2_view.prototype, "child", null);
    __decorate([
        $jin2_lazy
    ], $jin2_view.prototype, "attr", null);
    __decorate([
        $jin2_lazy
    ], $jin2_view.prototype, "field", null);
    __decorate([
        $jin2_lazy
    ], $jin2_view.prototype, "event", null);
    return $jin2_view;
})($jin2_atom);
//view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $jin2_demo_jtt = (function (_super) {
    __extends($jin2_demo_jtt, _super);
    function $jin2_demo_jtt() {
        _super.apply(this, arguments);
    }
    $jin2_demo_jtt.widget = function (id) { return new this(); };
    $jin2_demo_jtt.prototype.doClear = function (done) {
        this.items().set([]);
        $jin2_atom.induce();
        done();
    };
    $jin2_demo_jtt.prototype.doFill = function (count, done) {
        var items = [];
        for (var i = 0; i < count; i += 1) {
            items.push(this.item(i));
        }
        this.items().set(items);
        $jin2_atom.induce();
        done();
    };
    $jin2_demo_jtt.prototype.doUpdate = function (count, done) {
        this.items().get().forEach(function (item, index) {
            item.val().mutate(function (prev) { return prev + ' ' + prev; });
        });
        $jin2_atom.induce();
        done();
    };
    $jin2_demo_jtt.prototype.doInsert = function (index, done) {
        var _this = this;
        this.items().mutate(function (prev) {
            prev.splice(index, 0, _this.item('xx'));
            return prev;
        });
        this.items().notify();
        $jin2_atom.induce();
        done();
    };
    $jin2_demo_jtt.prototype.items = function () {
        return new $jin2_atom({
            pull_: function (prev) { return []; }
        });
    };
    $jin2_demo_jtt.prototype.child = function () { return this.items(); };
    $jin2_demo_jtt.prototype.tagName = function () {
        return new $jin2_prop({
            pull_: function () { return 'ul'; }
        });
    };
    $jin2_demo_jtt.prototype.item = function (id) { return new $jin2_demo_jtt_row(); };
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt.prototype, "items", null);
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt.prototype, "tagName", null);
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt.prototype, "item", null);
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt, "widget", null);
    return $jin2_demo_jtt;
})($jin2_view);
var $jin2_demo_jtt_row = (function (_super) {
    __extends($jin2_demo_jtt_row, _super);
    function $jin2_demo_jtt_row() {
        _super.apply(this, arguments);
    }
    $jin2_demo_jtt_row.prototype.val = function () {
        var _this = this;
        return new $jin2_atom({
            pull_: function (prev) { return '' + _this.objectId; }
        });
    };
    $jin2_demo_jtt_row.prototype.tagName = function () {
        return new $jin2_prop({
            pull_: function () { return 'li'; }
        });
    };
    $jin2_demo_jtt_row.prototype.child = function () {
        var _this = this;
        return new $jin2_prop({
            pull_: function (prev) { return ['jj: ' + _this.val().get()]; },
        });
    };
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt_row.prototype, "val", null);
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt_row.prototype, "tagName", null);
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt_row.prototype, "child", null);
    return $jin2_demo_jtt_row;
})($jin2_view);
//jtt.js.map
//# sourceMappingURL=index.env=web.stage=release.js.map