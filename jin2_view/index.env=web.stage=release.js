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
    function $jin2_object() {
        this._objectName = null;
        this._objectId = null;
        this._objectPath = null;
        this._objectOwner = null;
    }
    $jin2_object.prototype.destroy = function () {
        $jin2_log_info(this.objectPath + ' destroy');
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
    $jin2_object.toString = function () {
        return this.objectPath;
    };
    $jin2_object.prototype.toString = function () {
        return this.objectPath;
    };
    Object.defineProperty($jin2_object.prototype, "objectName", {
        get: function () {
            return (this._objectName == null)
                ? (this._objectName = '')
                : this._objectName;
        },
        set: function (next) {
            if (this._objectName != null)
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
            return (this._objectId == null)
                ? (this._objectId = String($jin2_object.seed++))
                : this._objectId;
        },
        set: function (next) {
            if (this._objectId != null)
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
            return (this._objectPath == null)
                ? (this._objectPath = $jin2_object_path(this.objectOwner) + '.' + this.objectName + '_' + this.objectId)
                : this._objectPath;
        },
        set: function (next) {
            if (this._objectPath != null)
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
            return this.objectOwner = this.constructor;
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
    $jin2_object.prototype.objectEquals = function (other) {
        return this === other;
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
    function $jin2_prop(pull, put) {
        _super.call(this);
        if (pull)
            this.pull_ = pull;
        if (put)
            this.put_ = put;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Map;
var Set;
var $jin2_atom = (function (_super) {
    __extends($jin2_atom, _super);
    function $jin2_atom(pull, put) {
        _super.call(this);
        this.value_ = void 0;
        this.error = $jin2_atom.obsolete;
        this.masters = null;
        this.mastersDeep = 0;
        this.slaves = null;
        if (pull)
            this.pull_ = pull;
        if (put)
            this.put_ = put;
    }
    $jin2_atom.prototype.pull_ = function (prev) { throw $jin2_atom.wait; };
    $jin2_atom.prototype.norm_ = function (next, prev) { return next; };
    $jin2_atom.prototype.put_ = function (next, prev) { return next; };
    $jin2_atom.prototype.notify_ = function (next, prev) { };
    $jin2_atom.prototype.fail_ = function (error) { return void 0; };
    $jin2_atom.prototype.reap_ = function () { return true; };
    $jin2_atom.prototype.reap = function () {
        $jin2_atom._planReap.delete(this);
        if (this.slaves)
            return;
        if (this.reap_()) {
            this.destroy();
            return true;
        }
        return false;
    };
    $jin2_atom.prototype.destroy = function () {
        $jin2_atom._planReap.delete(this);
        this.disobeyAll();
        _super.prototype.destroy.call(this);
    };
    $jin2_atom.prototype.touch = function () {
        var slave = $jin2_atom.stack[$jin2_atom.stack.length - 1];
        if (!slave)
            return;
        slave.obey(this);
        this.lead(slave);
    };
    $jin2_atom.prototype.get = function () {
        this.touch();
        if (this.error === $jin2_atom.obsolete)
            this.pull();
        if (this.error)
            throw this.error;
        return this.value_;
    };
    $jin2_atom.prototype.pull = function () {
        var _this = this;
        if (this.masters) {
            this.masters.forEach(function (linked, master) {
                _this.masters.set(master, false);
            });
        }
        this.mastersDeep = 0;
        this.error = $jin2_atom.wait;
        var index = $jin2_atom.stack.length;
        $jin2_atom.stack.push(this);
        var next = this.pull_(this.value_);
        $jin2_atom.stack.length = index;
        if (next !== void 0)
            this.push(next);
        if (this.masters) {
            var masters = this.masters;
            this.masters.forEach(function (linked, master) {
                if (linked)
                    return;
                masters.delete(master);
                master.dislead(_this);
            });
            if (!masters.size)
                this.masters = null;
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
        if (this.slaves) {
            this.slaves.forEach(function (slave) { return slave.update(); });
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
        if (!this.slaves)
            this.slaves = new Set;
        this.slaves.add(slave);
        $jin2_atom._planReap.delete(this);
    };
    $jin2_atom.prototype.dislead = function (slave) {
        if (!this.slaves)
            return;
        this.slaves.delete(slave);
        if (!this.slaves.size) {
            this.slaves = null;
            $jin2_atom.collect(this);
        }
    };
    $jin2_atom.prototype.disleadAll = function () {
        var _this = this;
        if (!this.slaves)
            return;
        this.slaves.forEach(function (slave) { return slave.disobey(_this); });
        this.slaves = null;
        $jin2_atom.collect(this);
    };
    $jin2_atom.prototype.obey = function (master) {
        if (!this.masters)
            this.masters = new Map;
        this.masters.set(master, true);
        var masterDeep = master.mastersDeep;
        if (this.mastersDeep <= masterDeep) {
            this.mastersDeep = masterDeep + 1;
        }
    };
    $jin2_atom.prototype.disobey = function (master) {
        if (!this.masters)
            return;
        this.masters.delete(master);
        if (!this.masters.size)
            this.masters = null;
    };
    $jin2_atom.prototype.disobeyAll = function () {
        var _this = this;
        if (!this.masters)
            return;
        this.masters.forEach(function (linked, master) { return master.dislead(_this); });
        this.masters = null;
        this.mastersDeep = 0;
    };
    $jin2_atom.prototype.mutate = function (mutate) {
        var next = mutate.call(this.objectOwner, this.value_);
        return this.set(next);
    };
    $jin2_atom.prototype.on = function (notify, fail) {
        if (!notify)
            notify = function (value) { return null; };
        if (!fail)
            fail = function (error) { return null; };
        var source = this;
        var Listener = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                _super.apply(this, arguments);
            }
            class_1.prototype.pull_ = function (prev) {
                return notify(source.get());
            };
            class_1.prototype.fail_ = function (error) {
                if (error === $jin2_atom.wait)
                    return;
                return fail(error);
            };
            return class_1;
        })($jin2_atom);
        var listener = new Listener;
        listener.objectName = 'listener';
        listener.objectOwner = this;
        listener.push(null);
        listener.update();
        return listener;
    };
    $jin2_atom.prototype.then = function (notify, fail) {
        if (!notify)
            notify = function (value) { return null; };
        if (!fail)
            fail = function (error) { return null; };
        var source = this;
        var Promise = (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                _super.apply(this, arguments);
            }
            class_2.prototype.pull_ = function (prev) {
                var val = source.get();
                if (val == void 0)
                    return;
                this.disobeyAll();
                return notify(val);
            };
            class_2.prototype.fail_ = function (error) {
                if (error === $jin2_atom.wait)
                    return;
                promise.disobeyAll();
                return fail(error);
            };
            return class_2;
        })($jin2_atom);
        var promise = new Promise;
        promise.objectName = 'promise';
        promise.objectOwner = this;
        promise.push(null);
        promise.update();
        return promise;
    };
    $jin2_atom.prototype.catch = function (fail) {
        return this.then(null, fail);
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
        this._planReap.add(atom);
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
            this._planReap.forEach(function (atom) {
                someReaped = atom.reap();
            });
            if (!someReaped)
                break;
        }
        clearTimeout(this._timer);
        this._timer = null;
    };
    $jin2_atom.wait = new Error('Wait...');
    $jin2_atom.obsolete = new Error('Obsolate state!');
    $jin2_atom.stack = $jin2_state_stack['$jin2_atom_stack'] = [];
    $jin2_atom._planPull = [];
    $jin2_atom._planReap = new Set;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin2_view = (function (_super) {
    __extends($jin2_view, _super);
    function $jin2_view() {
        _super.apply(this, arguments);
    }
    $jin2_view.prototype.tagName = function () {
        return { get: function () { return 'div'; } };
    };
    $jin2_view.prototype.nameSpace = function () {
        return { get: function () { return 'http://www.w3.org/1999/xhtml'; } };
    };
    $jin2_view.prototype.child = function () {
        return { get: function () { return null; } };
    };
    $jin2_view.prototype.attr = function () {
        return { get: function () { return {}; } };
    };
    $jin2_view.prototype.field = function () {
        return { get: function () { return {}; } };
    };
    $jin2_view.prototype.event = function () {
        return { get: function () { return {}; } };
    };
    $jin2_view.prototype.node = function () {
        var _this = this;
        return { get: function () {
                var id = _this.objectPath;
                var prev = document.getElementById(id);
                if (!prev) {
                    prev = document.createElementNS(_this.nameSpace().get(), _this.tagName().get());
                    prev.setAttribute('id', id);
                }
                var router = (document.body === prev) ? document : prev;
                var events = _this.event().get();
                for (var name in events)
                    (function (name) {
                        var prop = events[name];
                        router.addEventListener(name, function (event) {
                            if (event.defaultPrevented)
                                return;
                            prev[prop] = event;
                            $jin2_atom.induce();
                        }, false);
                    })(name);
                var proto2 = _this;
                while (proto2 && (proto2 !== $jin2_view.prototype)) {
                    var className = $jin2_object_path(proto2.constructor);
                    if (!className)
                        continue;
                    prev.setAttribute(className.replace(/\$/g, ''), "");
                    proto2 = Object.getPrototypeOf(proto2);
                }
                return prev;
            } };
    };
    $jin2_view.prototype.pull_ = function (prev) {
        if (!prev)
            prev = this.node().get();
        var attrs = this.attr().get();
        for (var name in attrs) {
            var p = prev.getAttribute(name);
            var n = String(attrs[name]);
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
        prev.removeAttribute('jin2_view_error');
        return prev;
    };
    $jin2_view.prototype.fail_ = function (error) {
        var node = this.node().get();
        if (error === $jin2_atom.wait) {
            node.setAttribute('jin2_view_error', 'wait');
        }
        else {
            node.setAttribute('jin2_view_error', 'fail');
        }
        return node;
    };
    return $jin2_view;
})($jin2_atom);
//view.js.map
;
function $jin2_lazy(prototype, name, descr) {
    var prefix = name + '_';
    var getValue = function (id) {
        if (id === void 0) { id = ''; }
        var field = prefix + id;
        if (this[field])
            return this[field];
        var obj = makeValue.call(this, id);
        obj.objectName = name;
        obj.objectId = id;
        obj.objectOwner = this;
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
function extend(obj, inject) {
    inject(obj);
    return obj;
}
var $jin2_demo_jtt = (function (_super) {
    __extends($jin2_demo_jtt, _super);
    function $jin2_demo_jtt() {
        _super.apply(this, arguments);
    }
    $jin2_demo_jtt.widget = function (id) {
        return new this();
    };
    $jin2_demo_jtt.prototype.items = function () {
        return new $jin2_atom(function (prev) { return []; });
    };
    $jin2_demo_jtt.prototype.child = function () {
        var _this = this;
        return { get: function () { return _this.items().get(); } };
    };
    $jin2_demo_jtt.prototype.tagName = function () {
        return { get: function () { return 'ul'; } };
    };
    $jin2_demo_jtt.prototype.val = function (id) {
        return new $jin2_atom(function (prev) { return id; });
    };
    $jin2_demo_jtt.prototype.item = function (id) {
        var _this = this;
        var next = new $jin2_demo_jtt_item;
        next.val = function () { return _this.val(id); };
        return next;
    };
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
        for (var i = 0; i < count; i += 1) {
            this.val(i).mutate(function (prev) {
                return prev + ' ' + prev;
            });
        }
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
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt.prototype, "items", null);
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt.prototype, "val", null);
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt.prototype, "item", null);
    __decorate([
        $jin2_lazy
    ], $jin2_demo_jtt, "widget", null);
    return $jin2_demo_jtt;
})($jin2_view);
var $jin2_demo_jtt_item = (function (_super) {
    __extends($jin2_demo_jtt_item, _super);
    function $jin2_demo_jtt_item() {
        _super.apply(this, arguments);
    }
    $jin2_demo_jtt_item.prototype.val = function () {
        return { get: function () { return '{val}'; } };
    };
    $jin2_demo_jtt_item.prototype.tagName = function () {
        return { get: function () { return 'li'; } };
    };
    $jin2_demo_jtt_item.prototype.child = function () {
        var _this = this;
        return { get: function () { return ['jj: ' + _this.val().get()]; } };
    };
    return $jin2_demo_jtt_item;
})($jin2_view);
//jtt.js.map
//# sourceMappingURL=index.env=web.stage=release.js.map