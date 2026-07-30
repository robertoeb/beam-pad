/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
var $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $TypeError = $util.global.TypeError, $String = $util.global.String, $Number = $util.global.Number, $Boolean = $util.global.Boolean, $Array = $util.global.Array;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.remote = (function() {

    /**
     * Namespace remote.
     * @exports remote
     * @namespace
     */
    var remote = {};

    remote.RemoteAppLinkLaunchRequest = (function() {

        /**
         * Properties of a RemoteAppLinkLaunchRequest.
         * @typedef {Object} remote.RemoteAppLinkLaunchRequest.$Properties
         * @property {string|null} [appLink] RemoteAppLinkLaunchRequest appLink
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteAppLinkLaunchRequest.
         * @memberof remote
         * @interface IRemoteAppLinkLaunchRequest
         * @augments remote.RemoteAppLinkLaunchRequest.$Properties
         * @deprecated Use remote.RemoteAppLinkLaunchRequest.$Properties instead.
         */

        /**
         * Shape of a RemoteAppLinkLaunchRequest.
         * @typedef {remote.RemoteAppLinkLaunchRequest.$Properties} remote.RemoteAppLinkLaunchRequest.$Shape
         */

        /**
         * Constructs a new RemoteAppLinkLaunchRequest.
         * @memberof remote
         * @classdesc Represents a RemoteAppLinkLaunchRequest.
         * @constructor
         * @param {remote.RemoteAppLinkLaunchRequest.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteAppLinkLaunchRequest = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteAppLinkLaunchRequest appLink.
         * @member {string} appLink
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @instance
         */
        RemoteAppLinkLaunchRequest.prototype.appLink = "";

        /**
         * Creates a new RemoteAppLinkLaunchRequest instance using the specified properties.
         * @function create
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @static
         * @param {remote.RemoteAppLinkLaunchRequest.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteAppLinkLaunchRequest} RemoteAppLinkLaunchRequest instance
         * @type {{
         *   (properties: remote.RemoteAppLinkLaunchRequest.$Shape): remote.RemoteAppLinkLaunchRequest & remote.RemoteAppLinkLaunchRequest.$Shape;
         *   (properties?: remote.RemoteAppLinkLaunchRequest.$Properties): remote.RemoteAppLinkLaunchRequest;
         * }}
         */
        RemoteAppLinkLaunchRequest.create = function(properties) {
            return new RemoteAppLinkLaunchRequest(properties);
        };

        /**
         * Encodes the specified RemoteAppLinkLaunchRequest message. Does not implicitly {@link remote.RemoteAppLinkLaunchRequest.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @static
         * @param {remote.RemoteAppLinkLaunchRequest.$Properties} message RemoteAppLinkLaunchRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteAppLinkLaunchRequest.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.appLink != null && $Object.hasOwnProperty.call(message, "appLink") && message.appLink !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.appLink);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteAppLinkLaunchRequest message, length delimited. Does not implicitly {@link remote.RemoteAppLinkLaunchRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @static
         * @param {remote.RemoteAppLinkLaunchRequest.$Properties} message RemoteAppLinkLaunchRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteAppLinkLaunchRequest.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteAppLinkLaunchRequest message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteAppLinkLaunchRequest & remote.RemoteAppLinkLaunchRequest.$Shape} RemoteAppLinkLaunchRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteAppLinkLaunchRequest.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteAppLinkLaunchRequest(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.appLink = value;
                        else
                            delete message.appLink;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteAppLinkLaunchRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteAppLinkLaunchRequest & remote.RemoteAppLinkLaunchRequest.$Shape} RemoteAppLinkLaunchRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteAppLinkLaunchRequest.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteAppLinkLaunchRequest message.
         * @function verify
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteAppLinkLaunchRequest.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.appLink != null && $Object.hasOwnProperty.call(message, "appLink"))
                if (!$util.isString(message.appLink))
                    return "appLink: string expected";
            return null;
        };

        /**
         * Creates a RemoteAppLinkLaunchRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteAppLinkLaunchRequest} RemoteAppLinkLaunchRequest
         */
        RemoteAppLinkLaunchRequest.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteAppLinkLaunchRequest)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteAppLinkLaunchRequest: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteAppLinkLaunchRequest();
            if (object.appLink != null)
                if (typeof object.appLink !== "string" || object.appLink.length)
                    message.appLink = $String(object.appLink);
            return message;
        };

        /**
         * Creates a plain object from a RemoteAppLinkLaunchRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @static
         * @param {remote.RemoteAppLinkLaunchRequest} message RemoteAppLinkLaunchRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteAppLinkLaunchRequest.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults)
                object.appLink = "";
            if (message.appLink != null && $Object.hasOwnProperty.call(message, "appLink"))
                object.appLink = message.appLink;
            return object;
        };

        /**
         * Converts this RemoteAppLinkLaunchRequest to JSON.
         * @function toJSON
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteAppLinkLaunchRequest.prototype.toJSON = function() {
            return RemoteAppLinkLaunchRequest.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteAppLinkLaunchRequest
         * @function getTypeUrl
         * @memberof remote.RemoteAppLinkLaunchRequest
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteAppLinkLaunchRequest.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteAppLinkLaunchRequest";
        };

        return RemoteAppLinkLaunchRequest;
    })();

    remote.RemoteResetPreferredAudioDevice = (function() {

        /**
         * Properties of a RemoteResetPreferredAudioDevice.
         * @typedef {Object} remote.RemoteResetPreferredAudioDevice.$Properties
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteResetPreferredAudioDevice.
         * @memberof remote
         * @interface IRemoteResetPreferredAudioDevice
         * @augments remote.RemoteResetPreferredAudioDevice.$Properties
         * @deprecated Use remote.RemoteResetPreferredAudioDevice.$Properties instead.
         */

        /**
         * Shape of a RemoteResetPreferredAudioDevice.
         * @typedef {remote.RemoteResetPreferredAudioDevice.$Properties} remote.RemoteResetPreferredAudioDevice.$Shape
         */

        /**
         * Constructs a new RemoteResetPreferredAudioDevice.
         * @memberof remote
         * @classdesc Represents a RemoteResetPreferredAudioDevice.
         * @constructor
         * @param {remote.RemoteResetPreferredAudioDevice.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteResetPreferredAudioDevice = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Creates a new RemoteResetPreferredAudioDevice instance using the specified properties.
         * @function create
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @static
         * @param {remote.RemoteResetPreferredAudioDevice.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteResetPreferredAudioDevice} RemoteResetPreferredAudioDevice instance
         * @type {{
         *   (properties: remote.RemoteResetPreferredAudioDevice.$Shape): remote.RemoteResetPreferredAudioDevice & remote.RemoteResetPreferredAudioDevice.$Shape;
         *   (properties?: remote.RemoteResetPreferredAudioDevice.$Properties): remote.RemoteResetPreferredAudioDevice;
         * }}
         */
        RemoteResetPreferredAudioDevice.create = function(properties) {
            return new RemoteResetPreferredAudioDevice(properties);
        };

        /**
         * Encodes the specified RemoteResetPreferredAudioDevice message. Does not implicitly {@link remote.RemoteResetPreferredAudioDevice.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @static
         * @param {remote.RemoteResetPreferredAudioDevice.$Properties} message RemoteResetPreferredAudioDevice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteResetPreferredAudioDevice.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteResetPreferredAudioDevice message, length delimited. Does not implicitly {@link remote.RemoteResetPreferredAudioDevice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @static
         * @param {remote.RemoteResetPreferredAudioDevice.$Properties} message RemoteResetPreferredAudioDevice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteResetPreferredAudioDevice.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteResetPreferredAudioDevice message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteResetPreferredAudioDevice & remote.RemoteResetPreferredAudioDevice.$Shape} RemoteResetPreferredAudioDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteResetPreferredAudioDevice.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteResetPreferredAudioDevice();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                reader.skipType(tag & 7, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteResetPreferredAudioDevice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteResetPreferredAudioDevice & remote.RemoteResetPreferredAudioDevice.$Shape} RemoteResetPreferredAudioDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteResetPreferredAudioDevice.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteResetPreferredAudioDevice message.
         * @function verify
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteResetPreferredAudioDevice.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            return null;
        };

        /**
         * Creates a RemoteResetPreferredAudioDevice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteResetPreferredAudioDevice} RemoteResetPreferredAudioDevice
         */
        RemoteResetPreferredAudioDevice.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteResetPreferredAudioDevice)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteResetPreferredAudioDevice: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            return new $root.remote.RemoteResetPreferredAudioDevice();
        };

        /**
         * Creates a plain object from a RemoteResetPreferredAudioDevice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @static
         * @param {remote.RemoteResetPreferredAudioDevice} message RemoteResetPreferredAudioDevice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteResetPreferredAudioDevice.toObject = function () {
            return {};
        };

        /**
         * Converts this RemoteResetPreferredAudioDevice to JSON.
         * @function toJSON
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteResetPreferredAudioDevice.prototype.toJSON = function() {
            return RemoteResetPreferredAudioDevice.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteResetPreferredAudioDevice
         * @function getTypeUrl
         * @memberof remote.RemoteResetPreferredAudioDevice
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteResetPreferredAudioDevice.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteResetPreferredAudioDevice";
        };

        return RemoteResetPreferredAudioDevice;
    })();

    remote.RemoteSetPreferredAudioDevice = (function() {

        /**
         * Properties of a RemoteSetPreferredAudioDevice.
         * @typedef {Object} remote.RemoteSetPreferredAudioDevice.$Properties
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteSetPreferredAudioDevice.
         * @memberof remote
         * @interface IRemoteSetPreferredAudioDevice
         * @augments remote.RemoteSetPreferredAudioDevice.$Properties
         * @deprecated Use remote.RemoteSetPreferredAudioDevice.$Properties instead.
         */

        /**
         * Shape of a RemoteSetPreferredAudioDevice.
         * @typedef {remote.RemoteSetPreferredAudioDevice.$Properties} remote.RemoteSetPreferredAudioDevice.$Shape
         */

        /**
         * Constructs a new RemoteSetPreferredAudioDevice.
         * @memberof remote
         * @classdesc Represents a RemoteSetPreferredAudioDevice.
         * @constructor
         * @param {remote.RemoteSetPreferredAudioDevice.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteSetPreferredAudioDevice = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Creates a new RemoteSetPreferredAudioDevice instance using the specified properties.
         * @function create
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @static
         * @param {remote.RemoteSetPreferredAudioDevice.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteSetPreferredAudioDevice} RemoteSetPreferredAudioDevice instance
         * @type {{
         *   (properties: remote.RemoteSetPreferredAudioDevice.$Shape): remote.RemoteSetPreferredAudioDevice & remote.RemoteSetPreferredAudioDevice.$Shape;
         *   (properties?: remote.RemoteSetPreferredAudioDevice.$Properties): remote.RemoteSetPreferredAudioDevice;
         * }}
         */
        RemoteSetPreferredAudioDevice.create = function(properties) {
            return new RemoteSetPreferredAudioDevice(properties);
        };

        /**
         * Encodes the specified RemoteSetPreferredAudioDevice message. Does not implicitly {@link remote.RemoteSetPreferredAudioDevice.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @static
         * @param {remote.RemoteSetPreferredAudioDevice.$Properties} message RemoteSetPreferredAudioDevice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteSetPreferredAudioDevice.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteSetPreferredAudioDevice message, length delimited. Does not implicitly {@link remote.RemoteSetPreferredAudioDevice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @static
         * @param {remote.RemoteSetPreferredAudioDevice.$Properties} message RemoteSetPreferredAudioDevice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteSetPreferredAudioDevice.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteSetPreferredAudioDevice message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteSetPreferredAudioDevice & remote.RemoteSetPreferredAudioDevice.$Shape} RemoteSetPreferredAudioDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteSetPreferredAudioDevice.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteSetPreferredAudioDevice();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                reader.skipType(tag & 7, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteSetPreferredAudioDevice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteSetPreferredAudioDevice & remote.RemoteSetPreferredAudioDevice.$Shape} RemoteSetPreferredAudioDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteSetPreferredAudioDevice.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteSetPreferredAudioDevice message.
         * @function verify
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteSetPreferredAudioDevice.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            return null;
        };

        /**
         * Creates a RemoteSetPreferredAudioDevice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteSetPreferredAudioDevice} RemoteSetPreferredAudioDevice
         */
        RemoteSetPreferredAudioDevice.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteSetPreferredAudioDevice)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteSetPreferredAudioDevice: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            return new $root.remote.RemoteSetPreferredAudioDevice();
        };

        /**
         * Creates a plain object from a RemoteSetPreferredAudioDevice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @static
         * @param {remote.RemoteSetPreferredAudioDevice} message RemoteSetPreferredAudioDevice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteSetPreferredAudioDevice.toObject = function () {
            return {};
        };

        /**
         * Converts this RemoteSetPreferredAudioDevice to JSON.
         * @function toJSON
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteSetPreferredAudioDevice.prototype.toJSON = function() {
            return RemoteSetPreferredAudioDevice.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteSetPreferredAudioDevice
         * @function getTypeUrl
         * @memberof remote.RemoteSetPreferredAudioDevice
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteSetPreferredAudioDevice.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteSetPreferredAudioDevice";
        };

        return RemoteSetPreferredAudioDevice;
    })();

    remote.RemoteAdjustVolumeLevel = (function() {

        /**
         * Properties of a RemoteAdjustVolumeLevel.
         * @typedef {Object} remote.RemoteAdjustVolumeLevel.$Properties
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteAdjustVolumeLevel.
         * @memberof remote
         * @interface IRemoteAdjustVolumeLevel
         * @augments remote.RemoteAdjustVolumeLevel.$Properties
         * @deprecated Use remote.RemoteAdjustVolumeLevel.$Properties instead.
         */

        /**
         * Shape of a RemoteAdjustVolumeLevel.
         * @typedef {remote.RemoteAdjustVolumeLevel.$Properties} remote.RemoteAdjustVolumeLevel.$Shape
         */

        /**
         * Constructs a new RemoteAdjustVolumeLevel.
         * @memberof remote
         * @classdesc Represents a RemoteAdjustVolumeLevel.
         * @constructor
         * @param {remote.RemoteAdjustVolumeLevel.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteAdjustVolumeLevel = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Creates a new RemoteAdjustVolumeLevel instance using the specified properties.
         * @function create
         * @memberof remote.RemoteAdjustVolumeLevel
         * @static
         * @param {remote.RemoteAdjustVolumeLevel.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteAdjustVolumeLevel} RemoteAdjustVolumeLevel instance
         * @type {{
         *   (properties: remote.RemoteAdjustVolumeLevel.$Shape): remote.RemoteAdjustVolumeLevel & remote.RemoteAdjustVolumeLevel.$Shape;
         *   (properties?: remote.RemoteAdjustVolumeLevel.$Properties): remote.RemoteAdjustVolumeLevel;
         * }}
         */
        RemoteAdjustVolumeLevel.create = function(properties) {
            return new RemoteAdjustVolumeLevel(properties);
        };

        /**
         * Encodes the specified RemoteAdjustVolumeLevel message. Does not implicitly {@link remote.RemoteAdjustVolumeLevel.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteAdjustVolumeLevel
         * @static
         * @param {remote.RemoteAdjustVolumeLevel.$Properties} message RemoteAdjustVolumeLevel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteAdjustVolumeLevel.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteAdjustVolumeLevel message, length delimited. Does not implicitly {@link remote.RemoteAdjustVolumeLevel.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteAdjustVolumeLevel
         * @static
         * @param {remote.RemoteAdjustVolumeLevel.$Properties} message RemoteAdjustVolumeLevel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteAdjustVolumeLevel.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteAdjustVolumeLevel message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteAdjustVolumeLevel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteAdjustVolumeLevel & remote.RemoteAdjustVolumeLevel.$Shape} RemoteAdjustVolumeLevel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteAdjustVolumeLevel.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteAdjustVolumeLevel();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                reader.skipType(tag & 7, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteAdjustVolumeLevel message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteAdjustVolumeLevel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteAdjustVolumeLevel & remote.RemoteAdjustVolumeLevel.$Shape} RemoteAdjustVolumeLevel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteAdjustVolumeLevel.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteAdjustVolumeLevel message.
         * @function verify
         * @memberof remote.RemoteAdjustVolumeLevel
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteAdjustVolumeLevel.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            return null;
        };

        /**
         * Creates a RemoteAdjustVolumeLevel message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteAdjustVolumeLevel
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteAdjustVolumeLevel} RemoteAdjustVolumeLevel
         */
        RemoteAdjustVolumeLevel.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteAdjustVolumeLevel)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteAdjustVolumeLevel: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            return new $root.remote.RemoteAdjustVolumeLevel();
        };

        /**
         * Creates a plain object from a RemoteAdjustVolumeLevel message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteAdjustVolumeLevel
         * @static
         * @param {remote.RemoteAdjustVolumeLevel} message RemoteAdjustVolumeLevel
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteAdjustVolumeLevel.toObject = function () {
            return {};
        };

        /**
         * Converts this RemoteAdjustVolumeLevel to JSON.
         * @function toJSON
         * @memberof remote.RemoteAdjustVolumeLevel
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteAdjustVolumeLevel.prototype.toJSON = function() {
            return RemoteAdjustVolumeLevel.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteAdjustVolumeLevel
         * @function getTypeUrl
         * @memberof remote.RemoteAdjustVolumeLevel
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteAdjustVolumeLevel.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteAdjustVolumeLevel";
        };

        return RemoteAdjustVolumeLevel;
    })();

    remote.RemoteSetVolumeLevel = (function() {

        /**
         * Properties of a RemoteSetVolumeLevel.
         * @typedef {Object} remote.RemoteSetVolumeLevel.$Properties
         * @property {number|null} [unknown1] RemoteSetVolumeLevel unknown1
         * @property {number|null} [unknown2] RemoteSetVolumeLevel unknown2
         * @property {string|null} [playerModel] RemoteSetVolumeLevel playerModel
         * @property {number|null} [unknown4] RemoteSetVolumeLevel unknown4
         * @property {number|null} [unknown5] RemoteSetVolumeLevel unknown5
         * @property {number|null} [volumeMax] RemoteSetVolumeLevel volumeMax
         * @property {number|null} [volumeLevel] RemoteSetVolumeLevel volumeLevel
         * @property {boolean|null} [volumeMuted] RemoteSetVolumeLevel volumeMuted
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteSetVolumeLevel.
         * @memberof remote
         * @interface IRemoteSetVolumeLevel
         * @augments remote.RemoteSetVolumeLevel.$Properties
         * @deprecated Use remote.RemoteSetVolumeLevel.$Properties instead.
         */

        /**
         * Shape of a RemoteSetVolumeLevel.
         * @typedef {remote.RemoteSetVolumeLevel.$Properties} remote.RemoteSetVolumeLevel.$Shape
         */

        /**
         * Constructs a new RemoteSetVolumeLevel.
         * @memberof remote
         * @classdesc Represents a RemoteSetVolumeLevel.
         * @constructor
         * @param {remote.RemoteSetVolumeLevel.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteSetVolumeLevel = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteSetVolumeLevel unknown1.
         * @member {number} unknown1
         * @memberof remote.RemoteSetVolumeLevel
         * @instance
         */
        RemoteSetVolumeLevel.prototype.unknown1 = 0;

        /**
         * RemoteSetVolumeLevel unknown2.
         * @member {number} unknown2
         * @memberof remote.RemoteSetVolumeLevel
         * @instance
         */
        RemoteSetVolumeLevel.prototype.unknown2 = 0;

        /**
         * RemoteSetVolumeLevel playerModel.
         * @member {string} playerModel
         * @memberof remote.RemoteSetVolumeLevel
         * @instance
         */
        RemoteSetVolumeLevel.prototype.playerModel = "";

        /**
         * RemoteSetVolumeLevel unknown4.
         * @member {number} unknown4
         * @memberof remote.RemoteSetVolumeLevel
         * @instance
         */
        RemoteSetVolumeLevel.prototype.unknown4 = 0;

        /**
         * RemoteSetVolumeLevel unknown5.
         * @member {number} unknown5
         * @memberof remote.RemoteSetVolumeLevel
         * @instance
         */
        RemoteSetVolumeLevel.prototype.unknown5 = 0;

        /**
         * RemoteSetVolumeLevel volumeMax.
         * @member {number} volumeMax
         * @memberof remote.RemoteSetVolumeLevel
         * @instance
         */
        RemoteSetVolumeLevel.prototype.volumeMax = 0;

        /**
         * RemoteSetVolumeLevel volumeLevel.
         * @member {number} volumeLevel
         * @memberof remote.RemoteSetVolumeLevel
         * @instance
         */
        RemoteSetVolumeLevel.prototype.volumeLevel = 0;

        /**
         * RemoteSetVolumeLevel volumeMuted.
         * @member {boolean} volumeMuted
         * @memberof remote.RemoteSetVolumeLevel
         * @instance
         */
        RemoteSetVolumeLevel.prototype.volumeMuted = false;

        /**
         * Creates a new RemoteSetVolumeLevel instance using the specified properties.
         * @function create
         * @memberof remote.RemoteSetVolumeLevel
         * @static
         * @param {remote.RemoteSetVolumeLevel.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteSetVolumeLevel} RemoteSetVolumeLevel instance
         * @type {{
         *   (properties: remote.RemoteSetVolumeLevel.$Shape): remote.RemoteSetVolumeLevel & remote.RemoteSetVolumeLevel.$Shape;
         *   (properties?: remote.RemoteSetVolumeLevel.$Properties): remote.RemoteSetVolumeLevel;
         * }}
         */
        RemoteSetVolumeLevel.create = function(properties) {
            return new RemoteSetVolumeLevel(properties);
        };

        /**
         * Encodes the specified RemoteSetVolumeLevel message. Does not implicitly {@link remote.RemoteSetVolumeLevel.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteSetVolumeLevel
         * @static
         * @param {remote.RemoteSetVolumeLevel.$Properties} message RemoteSetVolumeLevel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteSetVolumeLevel.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.unknown1 != null && $Object.hasOwnProperty.call(message, "unknown1") && message.unknown1 !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.unknown1);
            if (message.unknown2 != null && $Object.hasOwnProperty.call(message, "unknown2") && message.unknown2 !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.unknown2);
            if (message.playerModel != null && $Object.hasOwnProperty.call(message, "playerModel") && message.playerModel !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.playerModel);
            if (message.unknown4 != null && $Object.hasOwnProperty.call(message, "unknown4") && message.unknown4 !== 0)
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.unknown4);
            if (message.unknown5 != null && $Object.hasOwnProperty.call(message, "unknown5") && message.unknown5 !== 0)
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.unknown5);
            if (message.volumeMax != null && $Object.hasOwnProperty.call(message, "volumeMax") && message.volumeMax !== 0)
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.volumeMax);
            if (message.volumeLevel != null && $Object.hasOwnProperty.call(message, "volumeLevel") && message.volumeLevel !== 0)
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.volumeLevel);
            if (message.volumeMuted != null && $Object.hasOwnProperty.call(message, "volumeMuted") && message.volumeMuted !== false)
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.volumeMuted);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteSetVolumeLevel message, length delimited. Does not implicitly {@link remote.RemoteSetVolumeLevel.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteSetVolumeLevel
         * @static
         * @param {remote.RemoteSetVolumeLevel.$Properties} message RemoteSetVolumeLevel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteSetVolumeLevel.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteSetVolumeLevel message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteSetVolumeLevel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteSetVolumeLevel & remote.RemoteSetVolumeLevel.$Shape} RemoteSetVolumeLevel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteSetVolumeLevel.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteSetVolumeLevel(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.unknown1 = value;
                        else
                            delete message.unknown1;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.unknown2 = value;
                        else
                            delete message.unknown2;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.playerModel = value;
                        else
                            delete message.playerModel;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.unknown4 = value;
                        else
                            delete message.unknown4;
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.unknown5 = value;
                        else
                            delete message.unknown5;
                        continue;
                    }
                case 6: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.volumeMax = value;
                        else
                            delete message.volumeMax;
                        continue;
                    }
                case 7: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.volumeLevel = value;
                        else
                            delete message.volumeLevel;
                        continue;
                    }
                case 8: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.volumeMuted = value;
                        else
                            delete message.volumeMuted;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteSetVolumeLevel message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteSetVolumeLevel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteSetVolumeLevel & remote.RemoteSetVolumeLevel.$Shape} RemoteSetVolumeLevel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteSetVolumeLevel.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteSetVolumeLevel message.
         * @function verify
         * @memberof remote.RemoteSetVolumeLevel
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteSetVolumeLevel.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.unknown1 != null && $Object.hasOwnProperty.call(message, "unknown1"))
                if (!$util.isInteger(message.unknown1))
                    return "unknown1: integer expected";
            if (message.unknown2 != null && $Object.hasOwnProperty.call(message, "unknown2"))
                if (!$util.isInteger(message.unknown2))
                    return "unknown2: integer expected";
            if (message.playerModel != null && $Object.hasOwnProperty.call(message, "playerModel"))
                if (!$util.isString(message.playerModel))
                    return "playerModel: string expected";
            if (message.unknown4 != null && $Object.hasOwnProperty.call(message, "unknown4"))
                if (!$util.isInteger(message.unknown4))
                    return "unknown4: integer expected";
            if (message.unknown5 != null && $Object.hasOwnProperty.call(message, "unknown5"))
                if (!$util.isInteger(message.unknown5))
                    return "unknown5: integer expected";
            if (message.volumeMax != null && $Object.hasOwnProperty.call(message, "volumeMax"))
                if (!$util.isInteger(message.volumeMax))
                    return "volumeMax: integer expected";
            if (message.volumeLevel != null && $Object.hasOwnProperty.call(message, "volumeLevel"))
                if (!$util.isInteger(message.volumeLevel))
                    return "volumeLevel: integer expected";
            if (message.volumeMuted != null && $Object.hasOwnProperty.call(message, "volumeMuted"))
                if (typeof message.volumeMuted !== "boolean")
                    return "volumeMuted: boolean expected";
            return null;
        };

        /**
         * Creates a RemoteSetVolumeLevel message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteSetVolumeLevel
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteSetVolumeLevel} RemoteSetVolumeLevel
         */
        RemoteSetVolumeLevel.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteSetVolumeLevel)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteSetVolumeLevel: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteSetVolumeLevel();
            if (object.unknown1 != null)
                if ($Number(object.unknown1) !== 0)
                    message.unknown1 = object.unknown1 >>> 0;
            if (object.unknown2 != null)
                if ($Number(object.unknown2) !== 0)
                    message.unknown2 = object.unknown2 >>> 0;
            if (object.playerModel != null)
                if (typeof object.playerModel !== "string" || object.playerModel.length)
                    message.playerModel = $String(object.playerModel);
            if (object.unknown4 != null)
                if ($Number(object.unknown4) !== 0)
                    message.unknown4 = object.unknown4 >>> 0;
            if (object.unknown5 != null)
                if ($Number(object.unknown5) !== 0)
                    message.unknown5 = object.unknown5 >>> 0;
            if (object.volumeMax != null)
                if ($Number(object.volumeMax) !== 0)
                    message.volumeMax = object.volumeMax >>> 0;
            if (object.volumeLevel != null)
                if ($Number(object.volumeLevel) !== 0)
                    message.volumeLevel = object.volumeLevel >>> 0;
            if (object.volumeMuted != null)
                if (object.volumeMuted)
                    message.volumeMuted = $Boolean(object.volumeMuted);
            return message;
        };

        /**
         * Creates a plain object from a RemoteSetVolumeLevel message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteSetVolumeLevel
         * @static
         * @param {remote.RemoteSetVolumeLevel} message RemoteSetVolumeLevel
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteSetVolumeLevel.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.unknown1 = 0;
                object.unknown2 = 0;
                object.playerModel = "";
                object.unknown4 = 0;
                object.unknown5 = 0;
                object.volumeMax = 0;
                object.volumeLevel = 0;
                object.volumeMuted = false;
            }
            if (message.unknown1 != null && $Object.hasOwnProperty.call(message, "unknown1"))
                object.unknown1 = message.unknown1;
            if (message.unknown2 != null && $Object.hasOwnProperty.call(message, "unknown2"))
                object.unknown2 = message.unknown2;
            if (message.playerModel != null && $Object.hasOwnProperty.call(message, "playerModel"))
                object.playerModel = message.playerModel;
            if (message.unknown4 != null && $Object.hasOwnProperty.call(message, "unknown4"))
                object.unknown4 = message.unknown4;
            if (message.unknown5 != null && $Object.hasOwnProperty.call(message, "unknown5"))
                object.unknown5 = message.unknown5;
            if (message.volumeMax != null && $Object.hasOwnProperty.call(message, "volumeMax"))
                object.volumeMax = message.volumeMax;
            if (message.volumeLevel != null && $Object.hasOwnProperty.call(message, "volumeLevel"))
                object.volumeLevel = message.volumeLevel;
            if (message.volumeMuted != null && $Object.hasOwnProperty.call(message, "volumeMuted"))
                object.volumeMuted = message.volumeMuted;
            return object;
        };

        /**
         * Converts this RemoteSetVolumeLevel to JSON.
         * @function toJSON
         * @memberof remote.RemoteSetVolumeLevel
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteSetVolumeLevel.prototype.toJSON = function() {
            return RemoteSetVolumeLevel.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteSetVolumeLevel
         * @function getTypeUrl
         * @memberof remote.RemoteSetVolumeLevel
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteSetVolumeLevel.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteSetVolumeLevel";
        };

        return RemoteSetVolumeLevel;
    })();

    remote.RemoteStart = (function() {

        /**
         * Properties of a RemoteStart.
         * @typedef {Object} remote.RemoteStart.$Properties
         * @property {boolean|null} [started] RemoteStart started
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteStart.
         * @memberof remote
         * @interface IRemoteStart
         * @augments remote.RemoteStart.$Properties
         * @deprecated Use remote.RemoteStart.$Properties instead.
         */

        /**
         * Shape of a RemoteStart.
         * @typedef {remote.RemoteStart.$Properties} remote.RemoteStart.$Shape
         */

        /**
         * Constructs a new RemoteStart.
         * @memberof remote
         * @classdesc Represents a RemoteStart.
         * @constructor
         * @param {remote.RemoteStart.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteStart = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteStart started.
         * @member {boolean} started
         * @memberof remote.RemoteStart
         * @instance
         */
        RemoteStart.prototype.started = false;

        /**
         * Creates a new RemoteStart instance using the specified properties.
         * @function create
         * @memberof remote.RemoteStart
         * @static
         * @param {remote.RemoteStart.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteStart} RemoteStart instance
         * @type {{
         *   (properties: remote.RemoteStart.$Shape): remote.RemoteStart & remote.RemoteStart.$Shape;
         *   (properties?: remote.RemoteStart.$Properties): remote.RemoteStart;
         * }}
         */
        RemoteStart.create = function(properties) {
            return new RemoteStart(properties);
        };

        /**
         * Encodes the specified RemoteStart message. Does not implicitly {@link remote.RemoteStart.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteStart
         * @static
         * @param {remote.RemoteStart.$Properties} message RemoteStart message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteStart.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.started != null && $Object.hasOwnProperty.call(message, "started") && message.started !== false)
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.started);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteStart message, length delimited. Does not implicitly {@link remote.RemoteStart.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteStart
         * @static
         * @param {remote.RemoteStart.$Properties} message RemoteStart message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteStart.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteStart message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteStart
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteStart & remote.RemoteStart.$Shape} RemoteStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteStart.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteStart(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.started = value;
                        else
                            delete message.started;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteStart message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteStart
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteStart & remote.RemoteStart.$Shape} RemoteStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteStart.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteStart message.
         * @function verify
         * @memberof remote.RemoteStart
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteStart.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.started != null && $Object.hasOwnProperty.call(message, "started"))
                if (typeof message.started !== "boolean")
                    return "started: boolean expected";
            return null;
        };

        /**
         * Creates a RemoteStart message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteStart
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteStart} RemoteStart
         */
        RemoteStart.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteStart)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteStart: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteStart();
            if (object.started != null)
                if (object.started)
                    message.started = $Boolean(object.started);
            return message;
        };

        /**
         * Creates a plain object from a RemoteStart message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteStart
         * @static
         * @param {remote.RemoteStart} message RemoteStart
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteStart.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults)
                object.started = false;
            if (message.started != null && $Object.hasOwnProperty.call(message, "started"))
                object.started = message.started;
            return object;
        };

        /**
         * Converts this RemoteStart to JSON.
         * @function toJSON
         * @memberof remote.RemoteStart
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteStart.prototype.toJSON = function() {
            return RemoteStart.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteStart
         * @function getTypeUrl
         * @memberof remote.RemoteStart
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteStart.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteStart";
        };

        return RemoteStart;
    })();

    remote.RemoteVoiceEnd = (function() {

        /**
         * Properties of a RemoteVoiceEnd.
         * @typedef {Object} remote.RemoteVoiceEnd.$Properties
         * @property {number|null} [sessionId] RemoteVoiceEnd sessionId
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteVoiceEnd.
         * @memberof remote
         * @interface IRemoteVoiceEnd
         * @augments remote.RemoteVoiceEnd.$Properties
         * @deprecated Use remote.RemoteVoiceEnd.$Properties instead.
         */

        /**
         * Shape of a RemoteVoiceEnd.
         * @typedef {remote.RemoteVoiceEnd.$Properties} remote.RemoteVoiceEnd.$Shape
         */

        /**
         * Constructs a new RemoteVoiceEnd.
         * @memberof remote
         * @classdesc Represents a RemoteVoiceEnd.
         * @constructor
         * @param {remote.RemoteVoiceEnd.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteVoiceEnd = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteVoiceEnd sessionId.
         * @member {number} sessionId
         * @memberof remote.RemoteVoiceEnd
         * @instance
         */
        RemoteVoiceEnd.prototype.sessionId = 0;

        /**
         * Creates a new RemoteVoiceEnd instance using the specified properties.
         * @function create
         * @memberof remote.RemoteVoiceEnd
         * @static
         * @param {remote.RemoteVoiceEnd.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteVoiceEnd} RemoteVoiceEnd instance
         * @type {{
         *   (properties: remote.RemoteVoiceEnd.$Shape): remote.RemoteVoiceEnd & remote.RemoteVoiceEnd.$Shape;
         *   (properties?: remote.RemoteVoiceEnd.$Properties): remote.RemoteVoiceEnd;
         * }}
         */
        RemoteVoiceEnd.create = function(properties) {
            return new RemoteVoiceEnd(properties);
        };

        /**
         * Encodes the specified RemoteVoiceEnd message. Does not implicitly {@link remote.RemoteVoiceEnd.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteVoiceEnd
         * @static
         * @param {remote.RemoteVoiceEnd.$Properties} message RemoteVoiceEnd message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteVoiceEnd.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId") && message.sessionId !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sessionId);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteVoiceEnd message, length delimited. Does not implicitly {@link remote.RemoteVoiceEnd.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteVoiceEnd
         * @static
         * @param {remote.RemoteVoiceEnd.$Properties} message RemoteVoiceEnd message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteVoiceEnd.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteVoiceEnd message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteVoiceEnd
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteVoiceEnd & remote.RemoteVoiceEnd.$Shape} RemoteVoiceEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteVoiceEnd.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteVoiceEnd(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.sessionId = value;
                        else
                            delete message.sessionId;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteVoiceEnd message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteVoiceEnd
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteVoiceEnd & remote.RemoteVoiceEnd.$Shape} RemoteVoiceEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteVoiceEnd.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteVoiceEnd message.
         * @function verify
         * @memberof remote.RemoteVoiceEnd
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteVoiceEnd.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                if (!$util.isInteger(message.sessionId))
                    return "sessionId: integer expected";
            return null;
        };

        /**
         * Creates a RemoteVoiceEnd message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteVoiceEnd
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteVoiceEnd} RemoteVoiceEnd
         */
        RemoteVoiceEnd.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteVoiceEnd)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteVoiceEnd: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteVoiceEnd();
            if (object.sessionId != null)
                if ($Number(object.sessionId) !== 0)
                    message.sessionId = object.sessionId | 0;
            return message;
        };

        /**
         * Creates a plain object from a RemoteVoiceEnd message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteVoiceEnd
         * @static
         * @param {remote.RemoteVoiceEnd} message RemoteVoiceEnd
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteVoiceEnd.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults)
                object.sessionId = 0;
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                object.sessionId = message.sessionId;
            return object;
        };

        /**
         * Converts this RemoteVoiceEnd to JSON.
         * @function toJSON
         * @memberof remote.RemoteVoiceEnd
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteVoiceEnd.prototype.toJSON = function() {
            return RemoteVoiceEnd.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteVoiceEnd
         * @function getTypeUrl
         * @memberof remote.RemoteVoiceEnd
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteVoiceEnd.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteVoiceEnd";
        };

        return RemoteVoiceEnd;
    })();

    remote.RemoteVoicePayload = (function() {

        /**
         * Properties of a RemoteVoicePayload.
         * @typedef {Object} remote.RemoteVoicePayload.$Properties
         * @property {number|null} [sessionId] RemoteVoicePayload sessionId
         * @property {Uint8Array|null} [samples] RemoteVoicePayload samples
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteVoicePayload.
         * @memberof remote
         * @interface IRemoteVoicePayload
         * @augments remote.RemoteVoicePayload.$Properties
         * @deprecated Use remote.RemoteVoicePayload.$Properties instead.
         */

        /**
         * Shape of a RemoteVoicePayload.
         * @typedef {remote.RemoteVoicePayload.$Properties} remote.RemoteVoicePayload.$Shape
         */

        /**
         * Constructs a new RemoteVoicePayload.
         * @memberof remote
         * @classdesc Represents a RemoteVoicePayload.
         * @constructor
         * @param {remote.RemoteVoicePayload.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteVoicePayload = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteVoicePayload sessionId.
         * @member {number} sessionId
         * @memberof remote.RemoteVoicePayload
         * @instance
         */
        RemoteVoicePayload.prototype.sessionId = 0;

        /**
         * RemoteVoicePayload samples.
         * @member {Uint8Array} samples
         * @memberof remote.RemoteVoicePayload
         * @instance
         */
        RemoteVoicePayload.prototype.samples = $util.newBuffer([]);

        /**
         * Creates a new RemoteVoicePayload instance using the specified properties.
         * @function create
         * @memberof remote.RemoteVoicePayload
         * @static
         * @param {remote.RemoteVoicePayload.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteVoicePayload} RemoteVoicePayload instance
         * @type {{
         *   (properties: remote.RemoteVoicePayload.$Shape): remote.RemoteVoicePayload & remote.RemoteVoicePayload.$Shape;
         *   (properties?: remote.RemoteVoicePayload.$Properties): remote.RemoteVoicePayload;
         * }}
         */
        RemoteVoicePayload.create = function(properties) {
            return new RemoteVoicePayload(properties);
        };

        /**
         * Encodes the specified RemoteVoicePayload message. Does not implicitly {@link remote.RemoteVoicePayload.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteVoicePayload
         * @static
         * @param {remote.RemoteVoicePayload.$Properties} message RemoteVoicePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteVoicePayload.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId") && message.sessionId !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sessionId);
            if (message.samples != null && $Object.hasOwnProperty.call(message, "samples") && message.samples.length)
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.samples);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteVoicePayload message, length delimited. Does not implicitly {@link remote.RemoteVoicePayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteVoicePayload
         * @static
         * @param {remote.RemoteVoicePayload.$Properties} message RemoteVoicePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteVoicePayload.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteVoicePayload message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteVoicePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteVoicePayload & remote.RemoteVoicePayload.$Shape} RemoteVoicePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteVoicePayload.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteVoicePayload(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.sessionId = value;
                        else
                            delete message.sessionId;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.samples = value;
                        else
                            delete message.samples;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteVoicePayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteVoicePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteVoicePayload & remote.RemoteVoicePayload.$Shape} RemoteVoicePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteVoicePayload.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteVoicePayload message.
         * @function verify
         * @memberof remote.RemoteVoicePayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteVoicePayload.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                if (!$util.isInteger(message.sessionId))
                    return "sessionId: integer expected";
            if (message.samples != null && $Object.hasOwnProperty.call(message, "samples"))
                if (!(message.samples && typeof message.samples.length === "number" || $util.isString(message.samples)))
                    return "samples: buffer expected";
            return null;
        };

        /**
         * Creates a RemoteVoicePayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteVoicePayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteVoicePayload} RemoteVoicePayload
         */
        RemoteVoicePayload.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteVoicePayload)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteVoicePayload: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteVoicePayload();
            if (object.sessionId != null)
                if ($Number(object.sessionId) !== 0)
                    message.sessionId = object.sessionId | 0;
            if (object.samples != null)
                if (object.samples.length)
                    if (typeof object.samples === "string")
                        $util.base64.decode(object.samples, message.samples = $util.newBuffer($util.base64.length(object.samples)), 0);
                    else if (object.samples.length >= 0)
                        message.samples = object.samples;
            return message;
        };

        /**
         * Creates a plain object from a RemoteVoicePayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteVoicePayload
         * @static
         * @param {remote.RemoteVoicePayload} message RemoteVoicePayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteVoicePayload.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.sessionId = 0;
                if (options.bytes === $String)
                    object.samples = "";
                else {
                    object.samples = [];
                    if (options.bytes !== $Array)
                        object.samples = $util.newBuffer(object.samples);
                }
            }
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                object.sessionId = message.sessionId;
            if (message.samples != null && $Object.hasOwnProperty.call(message, "samples"))
                object.samples = options.bytes === $String ? $util.base64.encode(message.samples, 0, message.samples.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.samples) : message.samples;
            return object;
        };

        /**
         * Converts this RemoteVoicePayload to JSON.
         * @function toJSON
         * @memberof remote.RemoteVoicePayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteVoicePayload.prototype.toJSON = function() {
            return RemoteVoicePayload.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteVoicePayload
         * @function getTypeUrl
         * @memberof remote.RemoteVoicePayload
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteVoicePayload.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteVoicePayload";
        };

        return RemoteVoicePayload;
    })();

    remote.RemoteVoiceBegin = (function() {

        /**
         * Properties of a RemoteVoiceBegin.
         * @typedef {Object} remote.RemoteVoiceBegin.$Properties
         * @property {number|null} [sessionId] RemoteVoiceBegin sessionId
         * @property {string|null} [packageName] RemoteVoiceBegin packageName
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteVoiceBegin.
         * @memberof remote
         * @interface IRemoteVoiceBegin
         * @augments remote.RemoteVoiceBegin.$Properties
         * @deprecated Use remote.RemoteVoiceBegin.$Properties instead.
         */

        /**
         * Shape of a RemoteVoiceBegin.
         * @typedef {remote.RemoteVoiceBegin.$Properties} remote.RemoteVoiceBegin.$Shape
         */

        /**
         * Constructs a new RemoteVoiceBegin.
         * @memberof remote
         * @classdesc Represents a RemoteVoiceBegin.
         * @constructor
         * @param {remote.RemoteVoiceBegin.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteVoiceBegin = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteVoiceBegin sessionId.
         * @member {number} sessionId
         * @memberof remote.RemoteVoiceBegin
         * @instance
         */
        RemoteVoiceBegin.prototype.sessionId = 0;

        /**
         * RemoteVoiceBegin packageName.
         * @member {string} packageName
         * @memberof remote.RemoteVoiceBegin
         * @instance
         */
        RemoteVoiceBegin.prototype.packageName = "";

        /**
         * Creates a new RemoteVoiceBegin instance using the specified properties.
         * @function create
         * @memberof remote.RemoteVoiceBegin
         * @static
         * @param {remote.RemoteVoiceBegin.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteVoiceBegin} RemoteVoiceBegin instance
         * @type {{
         *   (properties: remote.RemoteVoiceBegin.$Shape): remote.RemoteVoiceBegin & remote.RemoteVoiceBegin.$Shape;
         *   (properties?: remote.RemoteVoiceBegin.$Properties): remote.RemoteVoiceBegin;
         * }}
         */
        RemoteVoiceBegin.create = function(properties) {
            return new RemoteVoiceBegin(properties);
        };

        /**
         * Encodes the specified RemoteVoiceBegin message. Does not implicitly {@link remote.RemoteVoiceBegin.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteVoiceBegin
         * @static
         * @param {remote.RemoteVoiceBegin.$Properties} message RemoteVoiceBegin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteVoiceBegin.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId") && message.sessionId !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.sessionId);
            if (message.packageName != null && $Object.hasOwnProperty.call(message, "packageName") && message.packageName !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.packageName);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteVoiceBegin message, length delimited. Does not implicitly {@link remote.RemoteVoiceBegin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteVoiceBegin
         * @static
         * @param {remote.RemoteVoiceBegin.$Properties} message RemoteVoiceBegin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteVoiceBegin.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteVoiceBegin message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteVoiceBegin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteVoiceBegin & remote.RemoteVoiceBegin.$Shape} RemoteVoiceBegin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteVoiceBegin.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteVoiceBegin(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.sessionId = value;
                        else
                            delete message.sessionId;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.packageName = value;
                        else
                            delete message.packageName;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteVoiceBegin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteVoiceBegin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteVoiceBegin & remote.RemoteVoiceBegin.$Shape} RemoteVoiceBegin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteVoiceBegin.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteVoiceBegin message.
         * @function verify
         * @memberof remote.RemoteVoiceBegin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteVoiceBegin.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                if (!$util.isInteger(message.sessionId))
                    return "sessionId: integer expected";
            if (message.packageName != null && $Object.hasOwnProperty.call(message, "packageName"))
                if (!$util.isString(message.packageName))
                    return "packageName: string expected";
            return null;
        };

        /**
         * Creates a RemoteVoiceBegin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteVoiceBegin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteVoiceBegin} RemoteVoiceBegin
         */
        RemoteVoiceBegin.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteVoiceBegin)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteVoiceBegin: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteVoiceBegin();
            if (object.sessionId != null)
                if ($Number(object.sessionId) !== 0)
                    message.sessionId = object.sessionId | 0;
            if (object.packageName != null)
                if (typeof object.packageName !== "string" || object.packageName.length)
                    message.packageName = $String(object.packageName);
            return message;
        };

        /**
         * Creates a plain object from a RemoteVoiceBegin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteVoiceBegin
         * @static
         * @param {remote.RemoteVoiceBegin} message RemoteVoiceBegin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteVoiceBegin.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.sessionId = 0;
                object.packageName = "";
            }
            if (message.sessionId != null && $Object.hasOwnProperty.call(message, "sessionId"))
                object.sessionId = message.sessionId;
            if (message.packageName != null && $Object.hasOwnProperty.call(message, "packageName"))
                object.packageName = message.packageName;
            return object;
        };

        /**
         * Converts this RemoteVoiceBegin to JSON.
         * @function toJSON
         * @memberof remote.RemoteVoiceBegin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteVoiceBegin.prototype.toJSON = function() {
            return RemoteVoiceBegin.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteVoiceBegin
         * @function getTypeUrl
         * @memberof remote.RemoteVoiceBegin
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteVoiceBegin.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteVoiceBegin";
        };

        return RemoteVoiceBegin;
    })();

    remote.RemoteTextFieldStatus = (function() {

        /**
         * Properties of a RemoteTextFieldStatus.
         * @typedef {Object} remote.RemoteTextFieldStatus.$Properties
         * @property {number|null} [counterField] RemoteTextFieldStatus counterField
         * @property {string|null} [value] RemoteTextFieldStatus value
         * @property {number|null} [start] RemoteTextFieldStatus start
         * @property {number|null} [end] RemoteTextFieldStatus end
         * @property {number|null} [int5] RemoteTextFieldStatus int5
         * @property {string|null} [label] RemoteTextFieldStatus label
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteTextFieldStatus.
         * @memberof remote
         * @interface IRemoteTextFieldStatus
         * @augments remote.RemoteTextFieldStatus.$Properties
         * @deprecated Use remote.RemoteTextFieldStatus.$Properties instead.
         */

        /**
         * Shape of a RemoteTextFieldStatus.
         * @typedef {remote.RemoteTextFieldStatus.$Properties} remote.RemoteTextFieldStatus.$Shape
         */

        /**
         * Constructs a new RemoteTextFieldStatus.
         * @memberof remote
         * @classdesc Represents a RemoteTextFieldStatus.
         * @constructor
         * @param {remote.RemoteTextFieldStatus.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteTextFieldStatus = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteTextFieldStatus counterField.
         * @member {number} counterField
         * @memberof remote.RemoteTextFieldStatus
         * @instance
         */
        RemoteTextFieldStatus.prototype.counterField = 0;

        /**
         * RemoteTextFieldStatus value.
         * @member {string} value
         * @memberof remote.RemoteTextFieldStatus
         * @instance
         */
        RemoteTextFieldStatus.prototype.value = "";

        /**
         * RemoteTextFieldStatus start.
         * @member {number} start
         * @memberof remote.RemoteTextFieldStatus
         * @instance
         */
        RemoteTextFieldStatus.prototype.start = 0;

        /**
         * RemoteTextFieldStatus end.
         * @member {number} end
         * @memberof remote.RemoteTextFieldStatus
         * @instance
         */
        RemoteTextFieldStatus.prototype.end = 0;

        /**
         * RemoteTextFieldStatus int5.
         * @member {number} int5
         * @memberof remote.RemoteTextFieldStatus
         * @instance
         */
        RemoteTextFieldStatus.prototype.int5 = 0;

        /**
         * RemoteTextFieldStatus label.
         * @member {string} label
         * @memberof remote.RemoteTextFieldStatus
         * @instance
         */
        RemoteTextFieldStatus.prototype.label = "";

        /**
         * Creates a new RemoteTextFieldStatus instance using the specified properties.
         * @function create
         * @memberof remote.RemoteTextFieldStatus
         * @static
         * @param {remote.RemoteTextFieldStatus.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteTextFieldStatus} RemoteTextFieldStatus instance
         * @type {{
         *   (properties: remote.RemoteTextFieldStatus.$Shape): remote.RemoteTextFieldStatus & remote.RemoteTextFieldStatus.$Shape;
         *   (properties?: remote.RemoteTextFieldStatus.$Properties): remote.RemoteTextFieldStatus;
         * }}
         */
        RemoteTextFieldStatus.create = function(properties) {
            return new RemoteTextFieldStatus(properties);
        };

        /**
         * Encodes the specified RemoteTextFieldStatus message. Does not implicitly {@link remote.RemoteTextFieldStatus.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteTextFieldStatus
         * @static
         * @param {remote.RemoteTextFieldStatus.$Properties} message RemoteTextFieldStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteTextFieldStatus.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.counterField != null && $Object.hasOwnProperty.call(message, "counterField") && message.counterField !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.counterField);
            if (message.value != null && $Object.hasOwnProperty.call(message, "value") && message.value !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
            if (message.start != null && $Object.hasOwnProperty.call(message, "start") && message.start !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.start);
            if (message.end != null && $Object.hasOwnProperty.call(message, "end") && message.end !== 0)
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.end);
            if (message.int5 != null && $Object.hasOwnProperty.call(message, "int5") && message.int5 !== 0)
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.int5);
            if (message.label != null && $Object.hasOwnProperty.call(message, "label") && message.label !== "")
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.label);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteTextFieldStatus message, length delimited. Does not implicitly {@link remote.RemoteTextFieldStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteTextFieldStatus
         * @static
         * @param {remote.RemoteTextFieldStatus.$Properties} message RemoteTextFieldStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteTextFieldStatus.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteTextFieldStatus message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteTextFieldStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteTextFieldStatus & remote.RemoteTextFieldStatus.$Shape} RemoteTextFieldStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteTextFieldStatus.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteTextFieldStatus(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.counterField = value;
                        else
                            delete message.counterField;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.value = value;
                        else
                            delete message.value;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.start = value;
                        else
                            delete message.start;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.end = value;
                        else
                            delete message.end;
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.int5 = value;
                        else
                            delete message.int5;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.label = value;
                        else
                            delete message.label;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteTextFieldStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteTextFieldStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteTextFieldStatus & remote.RemoteTextFieldStatus.$Shape} RemoteTextFieldStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteTextFieldStatus.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteTextFieldStatus message.
         * @function verify
         * @memberof remote.RemoteTextFieldStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteTextFieldStatus.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.counterField != null && $Object.hasOwnProperty.call(message, "counterField"))
                if (!$util.isInteger(message.counterField))
                    return "counterField: integer expected";
            if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            if (message.start != null && $Object.hasOwnProperty.call(message, "start"))
                if (!$util.isInteger(message.start))
                    return "start: integer expected";
            if (message.end != null && $Object.hasOwnProperty.call(message, "end"))
                if (!$util.isInteger(message.end))
                    return "end: integer expected";
            if (message.int5 != null && $Object.hasOwnProperty.call(message, "int5"))
                if (!$util.isInteger(message.int5))
                    return "int5: integer expected";
            if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                if (!$util.isString(message.label))
                    return "label: string expected";
            return null;
        };

        /**
         * Creates a RemoteTextFieldStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteTextFieldStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteTextFieldStatus} RemoteTextFieldStatus
         */
        RemoteTextFieldStatus.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteTextFieldStatus)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteTextFieldStatus: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteTextFieldStatus();
            if (object.counterField != null)
                if ($Number(object.counterField) !== 0)
                    message.counterField = object.counterField | 0;
            if (object.value != null)
                if (typeof object.value !== "string" || object.value.length)
                    message.value = $String(object.value);
            if (object.start != null)
                if ($Number(object.start) !== 0)
                    message.start = object.start | 0;
            if (object.end != null)
                if ($Number(object.end) !== 0)
                    message.end = object.end | 0;
            if (object.int5 != null)
                if ($Number(object.int5) !== 0)
                    message.int5 = object.int5 | 0;
            if (object.label != null)
                if (typeof object.label !== "string" || object.label.length)
                    message.label = $String(object.label);
            return message;
        };

        /**
         * Creates a plain object from a RemoteTextFieldStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteTextFieldStatus
         * @static
         * @param {remote.RemoteTextFieldStatus} message RemoteTextFieldStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteTextFieldStatus.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.counterField = 0;
                object.value = "";
                object.start = 0;
                object.end = 0;
                object.int5 = 0;
                object.label = "";
            }
            if (message.counterField != null && $Object.hasOwnProperty.call(message, "counterField"))
                object.counterField = message.counterField;
            if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            if (message.start != null && $Object.hasOwnProperty.call(message, "start"))
                object.start = message.start;
            if (message.end != null && $Object.hasOwnProperty.call(message, "end"))
                object.end = message.end;
            if (message.int5 != null && $Object.hasOwnProperty.call(message, "int5"))
                object.int5 = message.int5;
            if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                object.label = message.label;
            return object;
        };

        /**
         * Converts this RemoteTextFieldStatus to JSON.
         * @function toJSON
         * @memberof remote.RemoteTextFieldStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteTextFieldStatus.prototype.toJSON = function() {
            return RemoteTextFieldStatus.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteTextFieldStatus
         * @function getTypeUrl
         * @memberof remote.RemoteTextFieldStatus
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteTextFieldStatus.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteTextFieldStatus";
        };

        return RemoteTextFieldStatus;
    })();

    remote.RemoteImeShowRequest = (function() {

        /**
         * Properties of a RemoteImeShowRequest.
         * @typedef {Object} remote.RemoteImeShowRequest.$Properties
         * @property {remote.RemoteTextFieldStatus.$Properties|null} [remoteTextFieldStatus] RemoteImeShowRequest remoteTextFieldStatus
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteImeShowRequest.
         * @memberof remote
         * @interface IRemoteImeShowRequest
         * @augments remote.RemoteImeShowRequest.$Properties
         * @deprecated Use remote.RemoteImeShowRequest.$Properties instead.
         */

        /**
         * Shape of a RemoteImeShowRequest.
         * @typedef {remote.RemoteImeShowRequest.$Properties} remote.RemoteImeShowRequest.$Shape
         */

        /**
         * Constructs a new RemoteImeShowRequest.
         * @memberof remote
         * @classdesc Represents a RemoteImeShowRequest.
         * @constructor
         * @param {remote.RemoteImeShowRequest.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteImeShowRequest = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteImeShowRequest remoteTextFieldStatus.
         * @member {remote.RemoteTextFieldStatus.$Properties|null|undefined} remoteTextFieldStatus
         * @memberof remote.RemoteImeShowRequest
         * @instance
         */
        RemoteImeShowRequest.prototype.remoteTextFieldStatus = null;

        /**
         * Creates a new RemoteImeShowRequest instance using the specified properties.
         * @function create
         * @memberof remote.RemoteImeShowRequest
         * @static
         * @param {remote.RemoteImeShowRequest.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteImeShowRequest} RemoteImeShowRequest instance
         * @type {{
         *   (properties: remote.RemoteImeShowRequest.$Shape): remote.RemoteImeShowRequest & remote.RemoteImeShowRequest.$Shape;
         *   (properties?: remote.RemoteImeShowRequest.$Properties): remote.RemoteImeShowRequest;
         * }}
         */
        RemoteImeShowRequest.create = function(properties) {
            return new RemoteImeShowRequest(properties);
        };

        /**
         * Encodes the specified RemoteImeShowRequest message. Does not implicitly {@link remote.RemoteImeShowRequest.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteImeShowRequest
         * @static
         * @param {remote.RemoteImeShowRequest.$Properties} message RemoteImeShowRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteImeShowRequest.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.remoteTextFieldStatus != null && $Object.hasOwnProperty.call(message, "remoteTextFieldStatus"))
                $root.remote.RemoteTextFieldStatus.encode(message.remoteTextFieldStatus, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteImeShowRequest message, length delimited. Does not implicitly {@link remote.RemoteImeShowRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteImeShowRequest
         * @static
         * @param {remote.RemoteImeShowRequest.$Properties} message RemoteImeShowRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteImeShowRequest.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteImeShowRequest message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteImeShowRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteImeShowRequest & remote.RemoteImeShowRequest.$Shape} RemoteImeShowRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteImeShowRequest.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteImeShowRequest(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.remoteTextFieldStatus = $root.remote.RemoteTextFieldStatus.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteTextFieldStatus);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteImeShowRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteImeShowRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteImeShowRequest & remote.RemoteImeShowRequest.$Shape} RemoteImeShowRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteImeShowRequest.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteImeShowRequest message.
         * @function verify
         * @memberof remote.RemoteImeShowRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteImeShowRequest.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.remoteTextFieldStatus != null && $Object.hasOwnProperty.call(message, "remoteTextFieldStatus")) {
                var error = $root.remote.RemoteTextFieldStatus.verify(message.remoteTextFieldStatus, _depth + 1);
                if (error)
                    return "remoteTextFieldStatus." + error;
            }
            return null;
        };

        /**
         * Creates a RemoteImeShowRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteImeShowRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteImeShowRequest} RemoteImeShowRequest
         */
        RemoteImeShowRequest.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteImeShowRequest)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteImeShowRequest: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteImeShowRequest();
            if (object.remoteTextFieldStatus != null) {
                if (!$util.isObject(object.remoteTextFieldStatus))
                    throw $TypeError(".remote.RemoteImeShowRequest.remoteTextFieldStatus: object expected");
                message.remoteTextFieldStatus = $root.remote.RemoteTextFieldStatus.fromObject(object.remoteTextFieldStatus, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a RemoteImeShowRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteImeShowRequest
         * @static
         * @param {remote.RemoteImeShowRequest} message RemoteImeShowRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteImeShowRequest.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults)
                object.remoteTextFieldStatus = null;
            if (message.remoteTextFieldStatus != null && $Object.hasOwnProperty.call(message, "remoteTextFieldStatus"))
                object.remoteTextFieldStatus = $root.remote.RemoteTextFieldStatus.toObject(message.remoteTextFieldStatus, options, _depth + 1);
            return object;
        };

        /**
         * Converts this RemoteImeShowRequest to JSON.
         * @function toJSON
         * @memberof remote.RemoteImeShowRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteImeShowRequest.prototype.toJSON = function() {
            return RemoteImeShowRequest.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteImeShowRequest
         * @function getTypeUrl
         * @memberof remote.RemoteImeShowRequest
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteImeShowRequest.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteImeShowRequest";
        };

        return RemoteImeShowRequest;
    })();

    remote.RemoteEditInfo = (function() {

        /**
         * Properties of a RemoteEditInfo.
         * @typedef {Object} remote.RemoteEditInfo.$Properties
         * @property {number|null} [insert] RemoteEditInfo insert
         * @property {remote.RemoteImeObject.$Properties|null} [textFieldStatus] RemoteEditInfo textFieldStatus
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteEditInfo.
         * @memberof remote
         * @interface IRemoteEditInfo
         * @augments remote.RemoteEditInfo.$Properties
         * @deprecated Use remote.RemoteEditInfo.$Properties instead.
         */

        /**
         * Shape of a RemoteEditInfo.
         * @typedef {remote.RemoteEditInfo.$Properties} remote.RemoteEditInfo.$Shape
         */

        /**
         * Constructs a new RemoteEditInfo.
         * @memberof remote
         * @classdesc Represents a RemoteEditInfo.
         * @constructor
         * @param {remote.RemoteEditInfo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteEditInfo = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteEditInfo insert.
         * @member {number} insert
         * @memberof remote.RemoteEditInfo
         * @instance
         */
        RemoteEditInfo.prototype.insert = 0;

        /**
         * RemoteEditInfo textFieldStatus.
         * @member {remote.RemoteImeObject.$Properties|null|undefined} textFieldStatus
         * @memberof remote.RemoteEditInfo
         * @instance
         */
        RemoteEditInfo.prototype.textFieldStatus = null;

        /**
         * Creates a new RemoteEditInfo instance using the specified properties.
         * @function create
         * @memberof remote.RemoteEditInfo
         * @static
         * @param {remote.RemoteEditInfo.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteEditInfo} RemoteEditInfo instance
         * @type {{
         *   (properties: remote.RemoteEditInfo.$Shape): remote.RemoteEditInfo & remote.RemoteEditInfo.$Shape;
         *   (properties?: remote.RemoteEditInfo.$Properties): remote.RemoteEditInfo;
         * }}
         */
        RemoteEditInfo.create = function(properties) {
            return new RemoteEditInfo(properties);
        };

        /**
         * Encodes the specified RemoteEditInfo message. Does not implicitly {@link remote.RemoteEditInfo.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteEditInfo
         * @static
         * @param {remote.RemoteEditInfo.$Properties} message RemoteEditInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteEditInfo.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.insert != null && $Object.hasOwnProperty.call(message, "insert") && message.insert !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.insert);
            if (message.textFieldStatus != null && $Object.hasOwnProperty.call(message, "textFieldStatus"))
                $root.remote.RemoteImeObject.encode(message.textFieldStatus, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteEditInfo message, length delimited. Does not implicitly {@link remote.RemoteEditInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteEditInfo
         * @static
         * @param {remote.RemoteEditInfo.$Properties} message RemoteEditInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteEditInfo.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteEditInfo message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteEditInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteEditInfo & remote.RemoteEditInfo.$Shape} RemoteEditInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteEditInfo.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteEditInfo(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.insert = value;
                        else
                            delete message.insert;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.textFieldStatus = $root.remote.RemoteImeObject.decode(reader, reader.uint32(), $undefined, _depth + 1, message.textFieldStatus);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteEditInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteEditInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteEditInfo & remote.RemoteEditInfo.$Shape} RemoteEditInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteEditInfo.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteEditInfo message.
         * @function verify
         * @memberof remote.RemoteEditInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteEditInfo.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.insert != null && $Object.hasOwnProperty.call(message, "insert"))
                if (!$util.isInteger(message.insert))
                    return "insert: integer expected";
            if (message.textFieldStatus != null && $Object.hasOwnProperty.call(message, "textFieldStatus")) {
                var error = $root.remote.RemoteImeObject.verify(message.textFieldStatus, _depth + 1);
                if (error)
                    return "textFieldStatus." + error;
            }
            return null;
        };

        /**
         * Creates a RemoteEditInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteEditInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteEditInfo} RemoteEditInfo
         */
        RemoteEditInfo.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteEditInfo)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteEditInfo: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteEditInfo();
            if (object.insert != null)
                if ($Number(object.insert) !== 0)
                    message.insert = object.insert | 0;
            if (object.textFieldStatus != null) {
                if (!$util.isObject(object.textFieldStatus))
                    throw $TypeError(".remote.RemoteEditInfo.textFieldStatus: object expected");
                message.textFieldStatus = $root.remote.RemoteImeObject.fromObject(object.textFieldStatus, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a RemoteEditInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteEditInfo
         * @static
         * @param {remote.RemoteEditInfo} message RemoteEditInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteEditInfo.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.insert = 0;
                object.textFieldStatus = null;
            }
            if (message.insert != null && $Object.hasOwnProperty.call(message, "insert"))
                object.insert = message.insert;
            if (message.textFieldStatus != null && $Object.hasOwnProperty.call(message, "textFieldStatus"))
                object.textFieldStatus = $root.remote.RemoteImeObject.toObject(message.textFieldStatus, options, _depth + 1);
            return object;
        };

        /**
         * Converts this RemoteEditInfo to JSON.
         * @function toJSON
         * @memberof remote.RemoteEditInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteEditInfo.prototype.toJSON = function() {
            return RemoteEditInfo.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteEditInfo
         * @function getTypeUrl
         * @memberof remote.RemoteEditInfo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteEditInfo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteEditInfo";
        };

        return RemoteEditInfo;
    })();

    remote.RemoteImeObject = (function() {

        /**
         * Properties of a RemoteImeObject.
         * @typedef {Object} remote.RemoteImeObject.$Properties
         * @property {number|null} [start] RemoteImeObject start
         * @property {number|null} [end] RemoteImeObject end
         * @property {string|null} [value] RemoteImeObject value
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteImeObject.
         * @memberof remote
         * @interface IRemoteImeObject
         * @augments remote.RemoteImeObject.$Properties
         * @deprecated Use remote.RemoteImeObject.$Properties instead.
         */

        /**
         * Shape of a RemoteImeObject.
         * @typedef {remote.RemoteImeObject.$Properties} remote.RemoteImeObject.$Shape
         */

        /**
         * Constructs a new RemoteImeObject.
         * @memberof remote
         * @classdesc Represents a RemoteImeObject.
         * @constructor
         * @param {remote.RemoteImeObject.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteImeObject = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteImeObject start.
         * @member {number} start
         * @memberof remote.RemoteImeObject
         * @instance
         */
        RemoteImeObject.prototype.start = 0;

        /**
         * RemoteImeObject end.
         * @member {number} end
         * @memberof remote.RemoteImeObject
         * @instance
         */
        RemoteImeObject.prototype.end = 0;

        /**
         * RemoteImeObject value.
         * @member {string} value
         * @memberof remote.RemoteImeObject
         * @instance
         */
        RemoteImeObject.prototype.value = "";

        /**
         * Creates a new RemoteImeObject instance using the specified properties.
         * @function create
         * @memberof remote.RemoteImeObject
         * @static
         * @param {remote.RemoteImeObject.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteImeObject} RemoteImeObject instance
         * @type {{
         *   (properties: remote.RemoteImeObject.$Shape): remote.RemoteImeObject & remote.RemoteImeObject.$Shape;
         *   (properties?: remote.RemoteImeObject.$Properties): remote.RemoteImeObject;
         * }}
         */
        RemoteImeObject.create = function(properties) {
            return new RemoteImeObject(properties);
        };

        /**
         * Encodes the specified RemoteImeObject message. Does not implicitly {@link remote.RemoteImeObject.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteImeObject
         * @static
         * @param {remote.RemoteImeObject.$Properties} message RemoteImeObject message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteImeObject.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.start != null && $Object.hasOwnProperty.call(message, "start") && message.start !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.start);
            if (message.end != null && $Object.hasOwnProperty.call(message, "end") && message.end !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.end);
            if (message.value != null && $Object.hasOwnProperty.call(message, "value") && message.value !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.value);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteImeObject message, length delimited. Does not implicitly {@link remote.RemoteImeObject.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteImeObject
         * @static
         * @param {remote.RemoteImeObject.$Properties} message RemoteImeObject message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteImeObject.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteImeObject message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteImeObject
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteImeObject & remote.RemoteImeObject.$Shape} RemoteImeObject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteImeObject.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteImeObject(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.start = value;
                        else
                            delete message.start;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.end = value;
                        else
                            delete message.end;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.value = value;
                        else
                            delete message.value;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteImeObject message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteImeObject
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteImeObject & remote.RemoteImeObject.$Shape} RemoteImeObject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteImeObject.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteImeObject message.
         * @function verify
         * @memberof remote.RemoteImeObject
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteImeObject.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.start != null && $Object.hasOwnProperty.call(message, "start"))
                if (!$util.isInteger(message.start))
                    return "start: integer expected";
            if (message.end != null && $Object.hasOwnProperty.call(message, "end"))
                if (!$util.isInteger(message.end))
                    return "end: integer expected";
            if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates a RemoteImeObject message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteImeObject
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteImeObject} RemoteImeObject
         */
        RemoteImeObject.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteImeObject)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteImeObject: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteImeObject();
            if (object.start != null)
                if ($Number(object.start) !== 0)
                    message.start = object.start | 0;
            if (object.end != null)
                if ($Number(object.end) !== 0)
                    message.end = object.end | 0;
            if (object.value != null)
                if (typeof object.value !== "string" || object.value.length)
                    message.value = $String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a RemoteImeObject message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteImeObject
         * @static
         * @param {remote.RemoteImeObject} message RemoteImeObject
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteImeObject.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.start = 0;
                object.end = 0;
                object.value = "";
            }
            if (message.start != null && $Object.hasOwnProperty.call(message, "start"))
                object.start = message.start;
            if (message.end != null && $Object.hasOwnProperty.call(message, "end"))
                object.end = message.end;
            if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this RemoteImeObject to JSON.
         * @function toJSON
         * @memberof remote.RemoteImeObject
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteImeObject.prototype.toJSON = function() {
            return RemoteImeObject.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteImeObject
         * @function getTypeUrl
         * @memberof remote.RemoteImeObject
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteImeObject.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteImeObject";
        };

        return RemoteImeObject;
    })();

    remote.RemoteImeBatchEdit = (function() {

        /**
         * Properties of a RemoteImeBatchEdit.
         * @typedef {Object} remote.RemoteImeBatchEdit.$Properties
         * @property {number|null} [imeCounter] RemoteImeBatchEdit imeCounter
         * @property {number|null} [fieldCounter] RemoteImeBatchEdit fieldCounter
         * @property {Array.<remote.RemoteEditInfo.$Properties>|null} [editInfo] RemoteImeBatchEdit editInfo
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteImeBatchEdit.
         * @memberof remote
         * @interface IRemoteImeBatchEdit
         * @augments remote.RemoteImeBatchEdit.$Properties
         * @deprecated Use remote.RemoteImeBatchEdit.$Properties instead.
         */

        /**
         * Shape of a RemoteImeBatchEdit.
         * @typedef {remote.RemoteImeBatchEdit.$Properties} remote.RemoteImeBatchEdit.$Shape
         */

        /**
         * Constructs a new RemoteImeBatchEdit.
         * @memberof remote
         * @classdesc Represents a RemoteImeBatchEdit.
         * @constructor
         * @param {remote.RemoteImeBatchEdit.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteImeBatchEdit = function (properties) {
            this.editInfo = [];
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteImeBatchEdit imeCounter.
         * @member {number} imeCounter
         * @memberof remote.RemoteImeBatchEdit
         * @instance
         */
        RemoteImeBatchEdit.prototype.imeCounter = 0;

        /**
         * RemoteImeBatchEdit fieldCounter.
         * @member {number} fieldCounter
         * @memberof remote.RemoteImeBatchEdit
         * @instance
         */
        RemoteImeBatchEdit.prototype.fieldCounter = 0;

        /**
         * RemoteImeBatchEdit editInfo.
         * @member {Array.<remote.RemoteEditInfo.$Properties>} editInfo
         * @memberof remote.RemoteImeBatchEdit
         * @instance
         */
        RemoteImeBatchEdit.prototype.editInfo = $util.emptyArray;

        /**
         * Creates a new RemoteImeBatchEdit instance using the specified properties.
         * @function create
         * @memberof remote.RemoteImeBatchEdit
         * @static
         * @param {remote.RemoteImeBatchEdit.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteImeBatchEdit} RemoteImeBatchEdit instance
         * @type {{
         *   (properties: remote.RemoteImeBatchEdit.$Shape): remote.RemoteImeBatchEdit & remote.RemoteImeBatchEdit.$Shape;
         *   (properties?: remote.RemoteImeBatchEdit.$Properties): remote.RemoteImeBatchEdit;
         * }}
         */
        RemoteImeBatchEdit.create = function(properties) {
            return new RemoteImeBatchEdit(properties);
        };

        /**
         * Encodes the specified RemoteImeBatchEdit message. Does not implicitly {@link remote.RemoteImeBatchEdit.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteImeBatchEdit
         * @static
         * @param {remote.RemoteImeBatchEdit.$Properties} message RemoteImeBatchEdit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteImeBatchEdit.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.imeCounter != null && $Object.hasOwnProperty.call(message, "imeCounter") && message.imeCounter !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.imeCounter);
            if (message.fieldCounter != null && $Object.hasOwnProperty.call(message, "fieldCounter") && message.fieldCounter !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.fieldCounter);
            if (message.editInfo != null && message.editInfo.length)
                for (var i = 0; i < message.editInfo.length; ++i)
                    $root.remote.RemoteEditInfo.encode(message.editInfo[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteImeBatchEdit message, length delimited. Does not implicitly {@link remote.RemoteImeBatchEdit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteImeBatchEdit
         * @static
         * @param {remote.RemoteImeBatchEdit.$Properties} message RemoteImeBatchEdit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteImeBatchEdit.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteImeBatchEdit message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteImeBatchEdit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteImeBatchEdit & remote.RemoteImeBatchEdit.$Shape} RemoteImeBatchEdit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteImeBatchEdit.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteImeBatchEdit(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.imeCounter = value;
                        else
                            delete message.imeCounter;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.fieldCounter = value;
                        else
                            delete message.fieldCounter;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if (!(message.editInfo && message.editInfo.length))
                            message.editInfo = [];
                        message.editInfo.push($root.remote.RemoteEditInfo.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteImeBatchEdit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteImeBatchEdit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteImeBatchEdit & remote.RemoteImeBatchEdit.$Shape} RemoteImeBatchEdit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteImeBatchEdit.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteImeBatchEdit message.
         * @function verify
         * @memberof remote.RemoteImeBatchEdit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteImeBatchEdit.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.imeCounter != null && $Object.hasOwnProperty.call(message, "imeCounter"))
                if (!$util.isInteger(message.imeCounter))
                    return "imeCounter: integer expected";
            if (message.fieldCounter != null && $Object.hasOwnProperty.call(message, "fieldCounter"))
                if (!$util.isInteger(message.fieldCounter))
                    return "fieldCounter: integer expected";
            if (message.editInfo != null && $Object.hasOwnProperty.call(message, "editInfo")) {
                if (!$Array.isArray(message.editInfo))
                    return "editInfo: array expected";
                for (var i = 0; i < message.editInfo.length; ++i) {
                    var error = $root.remote.RemoteEditInfo.verify(message.editInfo[i], _depth + 1);
                    if (error)
                        return "editInfo." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RemoteImeBatchEdit message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteImeBatchEdit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteImeBatchEdit} RemoteImeBatchEdit
         */
        RemoteImeBatchEdit.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteImeBatchEdit)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteImeBatchEdit: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteImeBatchEdit();
            if (object.imeCounter != null)
                if ($Number(object.imeCounter) !== 0)
                    message.imeCounter = object.imeCounter | 0;
            if (object.fieldCounter != null)
                if ($Number(object.fieldCounter) !== 0)
                    message.fieldCounter = object.fieldCounter | 0;
            if (object.editInfo) {
                if (!$Array.isArray(object.editInfo))
                    throw $TypeError(".remote.RemoteImeBatchEdit.editInfo: array expected");
                message.editInfo = $Array(object.editInfo.length);
                for (var i = 0; i < object.editInfo.length; ++i) {
                    if (!$util.isObject(object.editInfo[i]))
                        throw $TypeError(".remote.RemoteImeBatchEdit.editInfo: object expected");
                    message.editInfo[i] = $root.remote.RemoteEditInfo.fromObject(object.editInfo[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RemoteImeBatchEdit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteImeBatchEdit
         * @static
         * @param {remote.RemoteImeBatchEdit} message RemoteImeBatchEdit
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteImeBatchEdit.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.arrays || options.defaults)
                object.editInfo = [];
            if (options.defaults) {
                object.imeCounter = 0;
                object.fieldCounter = 0;
            }
            if (message.imeCounter != null && $Object.hasOwnProperty.call(message, "imeCounter"))
                object.imeCounter = message.imeCounter;
            if (message.fieldCounter != null && $Object.hasOwnProperty.call(message, "fieldCounter"))
                object.fieldCounter = message.fieldCounter;
            if (message.editInfo && message.editInfo.length) {
                object.editInfo = $Array(message.editInfo.length);
                for (var j = 0; j < message.editInfo.length; ++j)
                    object.editInfo[j] = $root.remote.RemoteEditInfo.toObject(message.editInfo[j], options, _depth + 1);
            }
            return object;
        };

        /**
         * Converts this RemoteImeBatchEdit to JSON.
         * @function toJSON
         * @memberof remote.RemoteImeBatchEdit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteImeBatchEdit.prototype.toJSON = function() {
            return RemoteImeBatchEdit.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteImeBatchEdit
         * @function getTypeUrl
         * @memberof remote.RemoteImeBatchEdit
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteImeBatchEdit.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteImeBatchEdit";
        };

        return RemoteImeBatchEdit;
    })();

    remote.RemoteAppInfo = (function() {

        /**
         * Properties of a RemoteAppInfo.
         * @typedef {Object} remote.RemoteAppInfo.$Properties
         * @property {number|null} [counter] RemoteAppInfo counter
         * @property {number|null} [int2] RemoteAppInfo int2
         * @property {number|null} [int3] RemoteAppInfo int3
         * @property {string|null} [int4] RemoteAppInfo int4
         * @property {number|null} [int7] RemoteAppInfo int7
         * @property {number|null} [int8] RemoteAppInfo int8
         * @property {string|null} [label] RemoteAppInfo label
         * @property {string|null} [appPackage] RemoteAppInfo appPackage
         * @property {number|null} [int13] RemoteAppInfo int13
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteAppInfo.
         * @memberof remote
         * @interface IRemoteAppInfo
         * @augments remote.RemoteAppInfo.$Properties
         * @deprecated Use remote.RemoteAppInfo.$Properties instead.
         */

        /**
         * Shape of a RemoteAppInfo.
         * @typedef {remote.RemoteAppInfo.$Properties} remote.RemoteAppInfo.$Shape
         */

        /**
         * Constructs a new RemoteAppInfo.
         * @memberof remote
         * @classdesc Represents a RemoteAppInfo.
         * @constructor
         * @param {remote.RemoteAppInfo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteAppInfo = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteAppInfo counter.
         * @member {number} counter
         * @memberof remote.RemoteAppInfo
         * @instance
         */
        RemoteAppInfo.prototype.counter = 0;

        /**
         * RemoteAppInfo int2.
         * @member {number} int2
         * @memberof remote.RemoteAppInfo
         * @instance
         */
        RemoteAppInfo.prototype.int2 = 0;

        /**
         * RemoteAppInfo int3.
         * @member {number} int3
         * @memberof remote.RemoteAppInfo
         * @instance
         */
        RemoteAppInfo.prototype.int3 = 0;

        /**
         * RemoteAppInfo int4.
         * @member {string} int4
         * @memberof remote.RemoteAppInfo
         * @instance
         */
        RemoteAppInfo.prototype.int4 = "";

        /**
         * RemoteAppInfo int7.
         * @member {number} int7
         * @memberof remote.RemoteAppInfo
         * @instance
         */
        RemoteAppInfo.prototype.int7 = 0;

        /**
         * RemoteAppInfo int8.
         * @member {number} int8
         * @memberof remote.RemoteAppInfo
         * @instance
         */
        RemoteAppInfo.prototype.int8 = 0;

        /**
         * RemoteAppInfo label.
         * @member {string} label
         * @memberof remote.RemoteAppInfo
         * @instance
         */
        RemoteAppInfo.prototype.label = "";

        /**
         * RemoteAppInfo appPackage.
         * @member {string} appPackage
         * @memberof remote.RemoteAppInfo
         * @instance
         */
        RemoteAppInfo.prototype.appPackage = "";

        /**
         * RemoteAppInfo int13.
         * @member {number} int13
         * @memberof remote.RemoteAppInfo
         * @instance
         */
        RemoteAppInfo.prototype.int13 = 0;

        /**
         * Creates a new RemoteAppInfo instance using the specified properties.
         * @function create
         * @memberof remote.RemoteAppInfo
         * @static
         * @param {remote.RemoteAppInfo.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteAppInfo} RemoteAppInfo instance
         * @type {{
         *   (properties: remote.RemoteAppInfo.$Shape): remote.RemoteAppInfo & remote.RemoteAppInfo.$Shape;
         *   (properties?: remote.RemoteAppInfo.$Properties): remote.RemoteAppInfo;
         * }}
         */
        RemoteAppInfo.create = function(properties) {
            return new RemoteAppInfo(properties);
        };

        /**
         * Encodes the specified RemoteAppInfo message. Does not implicitly {@link remote.RemoteAppInfo.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteAppInfo
         * @static
         * @param {remote.RemoteAppInfo.$Properties} message RemoteAppInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteAppInfo.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.counter != null && $Object.hasOwnProperty.call(message, "counter") && message.counter !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.counter);
            if (message.int2 != null && $Object.hasOwnProperty.call(message, "int2") && message.int2 !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.int2);
            if (message.int3 != null && $Object.hasOwnProperty.call(message, "int3") && message.int3 !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.int3);
            if (message.int4 != null && $Object.hasOwnProperty.call(message, "int4") && message.int4 !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.int4);
            if (message.int7 != null && $Object.hasOwnProperty.call(message, "int7") && message.int7 !== 0)
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.int7);
            if (message.int8 != null && $Object.hasOwnProperty.call(message, "int8") && message.int8 !== 0)
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.int8);
            if (message.label != null && $Object.hasOwnProperty.call(message, "label") && message.label !== "")
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.label);
            if (message.appPackage != null && $Object.hasOwnProperty.call(message, "appPackage") && message.appPackage !== "")
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.appPackage);
            if (message.int13 != null && $Object.hasOwnProperty.call(message, "int13") && message.int13 !== 0)
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.int13);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteAppInfo message, length delimited. Does not implicitly {@link remote.RemoteAppInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteAppInfo
         * @static
         * @param {remote.RemoteAppInfo.$Properties} message RemoteAppInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteAppInfo.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteAppInfo message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteAppInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteAppInfo & remote.RemoteAppInfo.$Shape} RemoteAppInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteAppInfo.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteAppInfo(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.counter = value;
                        else
                            delete message.counter;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.int2 = value;
                        else
                            delete message.int2;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.int3 = value;
                        else
                            delete message.int3;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.int4 = value;
                        else
                            delete message.int4;
                        continue;
                    }
                case 7: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.int7 = value;
                        else
                            delete message.int7;
                        continue;
                    }
                case 8: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.int8 = value;
                        else
                            delete message.int8;
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.label = value;
                        else
                            delete message.label;
                        continue;
                    }
                case 12: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.appPackage = value;
                        else
                            delete message.appPackage;
                        continue;
                    }
                case 13: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.int13 = value;
                        else
                            delete message.int13;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteAppInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteAppInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteAppInfo & remote.RemoteAppInfo.$Shape} RemoteAppInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteAppInfo.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteAppInfo message.
         * @function verify
         * @memberof remote.RemoteAppInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteAppInfo.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.counter != null && $Object.hasOwnProperty.call(message, "counter"))
                if (!$util.isInteger(message.counter))
                    return "counter: integer expected";
            if (message.int2 != null && $Object.hasOwnProperty.call(message, "int2"))
                if (!$util.isInteger(message.int2))
                    return "int2: integer expected";
            if (message.int3 != null && $Object.hasOwnProperty.call(message, "int3"))
                if (!$util.isInteger(message.int3))
                    return "int3: integer expected";
            if (message.int4 != null && $Object.hasOwnProperty.call(message, "int4"))
                if (!$util.isString(message.int4))
                    return "int4: string expected";
            if (message.int7 != null && $Object.hasOwnProperty.call(message, "int7"))
                if (!$util.isInteger(message.int7))
                    return "int7: integer expected";
            if (message.int8 != null && $Object.hasOwnProperty.call(message, "int8"))
                if (!$util.isInteger(message.int8))
                    return "int8: integer expected";
            if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                if (!$util.isString(message.label))
                    return "label: string expected";
            if (message.appPackage != null && $Object.hasOwnProperty.call(message, "appPackage"))
                if (!$util.isString(message.appPackage))
                    return "appPackage: string expected";
            if (message.int13 != null && $Object.hasOwnProperty.call(message, "int13"))
                if (!$util.isInteger(message.int13))
                    return "int13: integer expected";
            return null;
        };

        /**
         * Creates a RemoteAppInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteAppInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteAppInfo} RemoteAppInfo
         */
        RemoteAppInfo.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteAppInfo)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteAppInfo: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteAppInfo();
            if (object.counter != null)
                if ($Number(object.counter) !== 0)
                    message.counter = object.counter | 0;
            if (object.int2 != null)
                if ($Number(object.int2) !== 0)
                    message.int2 = object.int2 | 0;
            if (object.int3 != null)
                if ($Number(object.int3) !== 0)
                    message.int3 = object.int3 | 0;
            if (object.int4 != null)
                if (typeof object.int4 !== "string" || object.int4.length)
                    message.int4 = $String(object.int4);
            if (object.int7 != null)
                if ($Number(object.int7) !== 0)
                    message.int7 = object.int7 | 0;
            if (object.int8 != null)
                if ($Number(object.int8) !== 0)
                    message.int8 = object.int8 | 0;
            if (object.label != null)
                if (typeof object.label !== "string" || object.label.length)
                    message.label = $String(object.label);
            if (object.appPackage != null)
                if (typeof object.appPackage !== "string" || object.appPackage.length)
                    message.appPackage = $String(object.appPackage);
            if (object.int13 != null)
                if ($Number(object.int13) !== 0)
                    message.int13 = object.int13 | 0;
            return message;
        };

        /**
         * Creates a plain object from a RemoteAppInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteAppInfo
         * @static
         * @param {remote.RemoteAppInfo} message RemoteAppInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteAppInfo.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.counter = 0;
                object.int2 = 0;
                object.int3 = 0;
                object.int4 = "";
                object.int7 = 0;
                object.int8 = 0;
                object.label = "";
                object.appPackage = "";
                object.int13 = 0;
            }
            if (message.counter != null && $Object.hasOwnProperty.call(message, "counter"))
                object.counter = message.counter;
            if (message.int2 != null && $Object.hasOwnProperty.call(message, "int2"))
                object.int2 = message.int2;
            if (message.int3 != null && $Object.hasOwnProperty.call(message, "int3"))
                object.int3 = message.int3;
            if (message.int4 != null && $Object.hasOwnProperty.call(message, "int4"))
                object.int4 = message.int4;
            if (message.int7 != null && $Object.hasOwnProperty.call(message, "int7"))
                object.int7 = message.int7;
            if (message.int8 != null && $Object.hasOwnProperty.call(message, "int8"))
                object.int8 = message.int8;
            if (message.label != null && $Object.hasOwnProperty.call(message, "label"))
                object.label = message.label;
            if (message.appPackage != null && $Object.hasOwnProperty.call(message, "appPackage"))
                object.appPackage = message.appPackage;
            if (message.int13 != null && $Object.hasOwnProperty.call(message, "int13"))
                object.int13 = message.int13;
            return object;
        };

        /**
         * Converts this RemoteAppInfo to JSON.
         * @function toJSON
         * @memberof remote.RemoteAppInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteAppInfo.prototype.toJSON = function() {
            return RemoteAppInfo.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteAppInfo
         * @function getTypeUrl
         * @memberof remote.RemoteAppInfo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteAppInfo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteAppInfo";
        };

        return RemoteAppInfo;
    })();

    remote.RemoteImeKeyInject = (function() {

        /**
         * Properties of a RemoteImeKeyInject.
         * @typedef {Object} remote.RemoteImeKeyInject.$Properties
         * @property {remote.RemoteAppInfo.$Properties|null} [appInfo] RemoteImeKeyInject appInfo
         * @property {remote.RemoteTextFieldStatus.$Properties|null} [textFieldStatus] RemoteImeKeyInject textFieldStatus
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteImeKeyInject.
         * @memberof remote
         * @interface IRemoteImeKeyInject
         * @augments remote.RemoteImeKeyInject.$Properties
         * @deprecated Use remote.RemoteImeKeyInject.$Properties instead.
         */

        /**
         * Shape of a RemoteImeKeyInject.
         * @typedef {remote.RemoteImeKeyInject.$Properties} remote.RemoteImeKeyInject.$Shape
         */

        /**
         * Constructs a new RemoteImeKeyInject.
         * @memberof remote
         * @classdesc Represents a RemoteImeKeyInject.
         * @constructor
         * @param {remote.RemoteImeKeyInject.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteImeKeyInject = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteImeKeyInject appInfo.
         * @member {remote.RemoteAppInfo.$Properties|null|undefined} appInfo
         * @memberof remote.RemoteImeKeyInject
         * @instance
         */
        RemoteImeKeyInject.prototype.appInfo = null;

        /**
         * RemoteImeKeyInject textFieldStatus.
         * @member {remote.RemoteTextFieldStatus.$Properties|null|undefined} textFieldStatus
         * @memberof remote.RemoteImeKeyInject
         * @instance
         */
        RemoteImeKeyInject.prototype.textFieldStatus = null;

        /**
         * Creates a new RemoteImeKeyInject instance using the specified properties.
         * @function create
         * @memberof remote.RemoteImeKeyInject
         * @static
         * @param {remote.RemoteImeKeyInject.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteImeKeyInject} RemoteImeKeyInject instance
         * @type {{
         *   (properties: remote.RemoteImeKeyInject.$Shape): remote.RemoteImeKeyInject & remote.RemoteImeKeyInject.$Shape;
         *   (properties?: remote.RemoteImeKeyInject.$Properties): remote.RemoteImeKeyInject;
         * }}
         */
        RemoteImeKeyInject.create = function(properties) {
            return new RemoteImeKeyInject(properties);
        };

        /**
         * Encodes the specified RemoteImeKeyInject message. Does not implicitly {@link remote.RemoteImeKeyInject.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteImeKeyInject
         * @static
         * @param {remote.RemoteImeKeyInject.$Properties} message RemoteImeKeyInject message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteImeKeyInject.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.appInfo != null && $Object.hasOwnProperty.call(message, "appInfo"))
                $root.remote.RemoteAppInfo.encode(message.appInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.textFieldStatus != null && $Object.hasOwnProperty.call(message, "textFieldStatus"))
                $root.remote.RemoteTextFieldStatus.encode(message.textFieldStatus, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteImeKeyInject message, length delimited. Does not implicitly {@link remote.RemoteImeKeyInject.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteImeKeyInject
         * @static
         * @param {remote.RemoteImeKeyInject.$Properties} message RemoteImeKeyInject message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteImeKeyInject.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteImeKeyInject message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteImeKeyInject
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteImeKeyInject & remote.RemoteImeKeyInject.$Shape} RemoteImeKeyInject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteImeKeyInject.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteImeKeyInject(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.appInfo = $root.remote.RemoteAppInfo.decode(reader, reader.uint32(), $undefined, _depth + 1, message.appInfo);
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.textFieldStatus = $root.remote.RemoteTextFieldStatus.decode(reader, reader.uint32(), $undefined, _depth + 1, message.textFieldStatus);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteImeKeyInject message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteImeKeyInject
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteImeKeyInject & remote.RemoteImeKeyInject.$Shape} RemoteImeKeyInject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteImeKeyInject.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteImeKeyInject message.
         * @function verify
         * @memberof remote.RemoteImeKeyInject
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteImeKeyInject.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.appInfo != null && $Object.hasOwnProperty.call(message, "appInfo")) {
                var error = $root.remote.RemoteAppInfo.verify(message.appInfo, _depth + 1);
                if (error)
                    return "appInfo." + error;
            }
            if (message.textFieldStatus != null && $Object.hasOwnProperty.call(message, "textFieldStatus")) {
                var error = $root.remote.RemoteTextFieldStatus.verify(message.textFieldStatus, _depth + 1);
                if (error)
                    return "textFieldStatus." + error;
            }
            return null;
        };

        /**
         * Creates a RemoteImeKeyInject message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteImeKeyInject
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteImeKeyInject} RemoteImeKeyInject
         */
        RemoteImeKeyInject.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteImeKeyInject)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteImeKeyInject: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteImeKeyInject();
            if (object.appInfo != null) {
                if (!$util.isObject(object.appInfo))
                    throw $TypeError(".remote.RemoteImeKeyInject.appInfo: object expected");
                message.appInfo = $root.remote.RemoteAppInfo.fromObject(object.appInfo, _depth + 1);
            }
            if (object.textFieldStatus != null) {
                if (!$util.isObject(object.textFieldStatus))
                    throw $TypeError(".remote.RemoteImeKeyInject.textFieldStatus: object expected");
                message.textFieldStatus = $root.remote.RemoteTextFieldStatus.fromObject(object.textFieldStatus, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a RemoteImeKeyInject message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteImeKeyInject
         * @static
         * @param {remote.RemoteImeKeyInject} message RemoteImeKeyInject
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteImeKeyInject.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.appInfo = null;
                object.textFieldStatus = null;
            }
            if (message.appInfo != null && $Object.hasOwnProperty.call(message, "appInfo"))
                object.appInfo = $root.remote.RemoteAppInfo.toObject(message.appInfo, options, _depth + 1);
            if (message.textFieldStatus != null && $Object.hasOwnProperty.call(message, "textFieldStatus"))
                object.textFieldStatus = $root.remote.RemoteTextFieldStatus.toObject(message.textFieldStatus, options, _depth + 1);
            return object;
        };

        /**
         * Converts this RemoteImeKeyInject to JSON.
         * @function toJSON
         * @memberof remote.RemoteImeKeyInject
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteImeKeyInject.prototype.toJSON = function() {
            return RemoteImeKeyInject.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteImeKeyInject
         * @function getTypeUrl
         * @memberof remote.RemoteImeKeyInject
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteImeKeyInject.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteImeKeyInject";
        };

        return RemoteImeKeyInject;
    })();

    /**
     * RemoteDirection enum.
     * @name remote.RemoteDirection
     * @enum {number}
     * @property {number} UNKNOWN_DIRECTION=0 UNKNOWN_DIRECTION value
     * @property {number} START_LONG=1 START_LONG value
     * @property {number} END_LONG=2 END_LONG value
     * @property {number} SHORT=3 SHORT value
     */
    remote.RemoteDirection = (function() {
        var valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_DIRECTION"] = 0;
        values[valuesById[1] = "START_LONG"] = 1;
        values[valuesById[2] = "END_LONG"] = 2;
        values[valuesById[3] = "SHORT"] = 3;
        return values;
    })();

    remote.RemoteKeyInject = (function() {

        /**
         * Properties of a RemoteKeyInject.
         * @typedef {Object} remote.RemoteKeyInject.$Properties
         * @property {remote.RemoteKeyCode|null} [keyCode] RemoteKeyInject keyCode
         * @property {remote.RemoteDirection|null} [direction] RemoteKeyInject direction
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteKeyInject.
         * @memberof remote
         * @interface IRemoteKeyInject
         * @augments remote.RemoteKeyInject.$Properties
         * @deprecated Use remote.RemoteKeyInject.$Properties instead.
         */

        /**
         * Shape of a RemoteKeyInject.
         * @typedef {remote.RemoteKeyInject.$Properties} remote.RemoteKeyInject.$Shape
         */

        /**
         * Constructs a new RemoteKeyInject.
         * @memberof remote
         * @classdesc Represents a RemoteKeyInject.
         * @constructor
         * @param {remote.RemoteKeyInject.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteKeyInject = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteKeyInject keyCode.
         * @member {remote.RemoteKeyCode} keyCode
         * @memberof remote.RemoteKeyInject
         * @instance
         */
        RemoteKeyInject.prototype.keyCode = 0;

        /**
         * RemoteKeyInject direction.
         * @member {remote.RemoteDirection} direction
         * @memberof remote.RemoteKeyInject
         * @instance
         */
        RemoteKeyInject.prototype.direction = 0;

        /**
         * Creates a new RemoteKeyInject instance using the specified properties.
         * @function create
         * @memberof remote.RemoteKeyInject
         * @static
         * @param {remote.RemoteKeyInject.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteKeyInject} RemoteKeyInject instance
         * @type {{
         *   (properties: remote.RemoteKeyInject.$Shape): remote.RemoteKeyInject & remote.RemoteKeyInject.$Shape;
         *   (properties?: remote.RemoteKeyInject.$Properties): remote.RemoteKeyInject;
         * }}
         */
        RemoteKeyInject.create = function(properties) {
            return new RemoteKeyInject(properties);
        };

        /**
         * Encodes the specified RemoteKeyInject message. Does not implicitly {@link remote.RemoteKeyInject.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteKeyInject
         * @static
         * @param {remote.RemoteKeyInject.$Properties} message RemoteKeyInject message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteKeyInject.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.keyCode != null && $Object.hasOwnProperty.call(message, "keyCode") && message.keyCode !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.keyCode);
            if (message.direction != null && $Object.hasOwnProperty.call(message, "direction") && message.direction !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.direction);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteKeyInject message, length delimited. Does not implicitly {@link remote.RemoteKeyInject.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteKeyInject
         * @static
         * @param {remote.RemoteKeyInject.$Properties} message RemoteKeyInject message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteKeyInject.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteKeyInject message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteKeyInject
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteKeyInject & remote.RemoteKeyInject.$Shape} RemoteKeyInject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteKeyInject.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteKeyInject(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.keyCode = value;
                        else
                            delete message.keyCode;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.direction = value;
                        else
                            delete message.direction;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteKeyInject message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteKeyInject
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteKeyInject & remote.RemoteKeyInject.$Shape} RemoteKeyInject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteKeyInject.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteKeyInject message.
         * @function verify
         * @memberof remote.RemoteKeyInject
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteKeyInject.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.keyCode != null && $Object.hasOwnProperty.call(message, "keyCode"))
                if (typeof message.keyCode !== "number" || (message.keyCode | 0) !== message.keyCode)
                    return "keyCode: enum value expected";
            if (message.direction != null && $Object.hasOwnProperty.call(message, "direction"))
                if (typeof message.direction !== "number" || (message.direction | 0) !== message.direction)
                    return "direction: enum value expected";
            return null;
        };

        /**
         * Creates a RemoteKeyInject message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteKeyInject
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteKeyInject} RemoteKeyInject
         */
        RemoteKeyInject.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteKeyInject)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteKeyInject: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteKeyInject();
            if (object.keyCode !== 0 && (typeof object.keyCode !== "string" || $root.remote.RemoteKeyCode[object.keyCode] !== 0))
                switch (object.keyCode) {
                case "KEYCODE_UNKNOWN":
                case 0:
                    message.keyCode = 0;
                    break;
                case "KEYCODE_SOFT_LEFT":
                case 1:
                    message.keyCode = 1;
                    break;
                case "KEYCODE_SOFT_RIGHT":
                case 2:
                    message.keyCode = 2;
                    break;
                case "KEYCODE_HOME":
                case 3:
                    message.keyCode = 3;
                    break;
                case "KEYCODE_BACK":
                case 4:
                    message.keyCode = 4;
                    break;
                case "KEYCODE_CALL":
                case 5:
                    message.keyCode = 5;
                    break;
                case "KEYCODE_ENDCALL":
                case 6:
                    message.keyCode = 6;
                    break;
                case "KEYCODE_0":
                case 7:
                    message.keyCode = 7;
                    break;
                case "KEYCODE_1":
                case 8:
                    message.keyCode = 8;
                    break;
                case "KEYCODE_2":
                case 9:
                    message.keyCode = 9;
                    break;
                case "KEYCODE_3":
                case 10:
                    message.keyCode = 10;
                    break;
                case "KEYCODE_4":
                case 11:
                    message.keyCode = 11;
                    break;
                case "KEYCODE_5":
                case 12:
                    message.keyCode = 12;
                    break;
                case "KEYCODE_6":
                case 13:
                    message.keyCode = 13;
                    break;
                case "KEYCODE_7":
                case 14:
                    message.keyCode = 14;
                    break;
                case "KEYCODE_8":
                case 15:
                    message.keyCode = 15;
                    break;
                case "KEYCODE_9":
                case 16:
                    message.keyCode = 16;
                    break;
                case "KEYCODE_STAR":
                case 17:
                    message.keyCode = 17;
                    break;
                case "KEYCODE_POUND":
                case 18:
                    message.keyCode = 18;
                    break;
                case "KEYCODE_DPAD_UP":
                case 19:
                    message.keyCode = 19;
                    break;
                case "KEYCODE_DPAD_DOWN":
                case 20:
                    message.keyCode = 20;
                    break;
                case "KEYCODE_DPAD_LEFT":
                case 21:
                    message.keyCode = 21;
                    break;
                case "KEYCODE_DPAD_RIGHT":
                case 22:
                    message.keyCode = 22;
                    break;
                case "KEYCODE_DPAD_CENTER":
                case 23:
                    message.keyCode = 23;
                    break;
                case "KEYCODE_VOLUME_UP":
                case 24:
                    message.keyCode = 24;
                    break;
                case "KEYCODE_VOLUME_DOWN":
                case 25:
                    message.keyCode = 25;
                    break;
                case "KEYCODE_POWER":
                case 26:
                    message.keyCode = 26;
                    break;
                case "KEYCODE_CAMERA":
                case 27:
                    message.keyCode = 27;
                    break;
                case "KEYCODE_CLEAR":
                case 28:
                    message.keyCode = 28;
                    break;
                case "KEYCODE_A":
                case 29:
                    message.keyCode = 29;
                    break;
                case "KEYCODE_B":
                case 30:
                    message.keyCode = 30;
                    break;
                case "KEYCODE_C":
                case 31:
                    message.keyCode = 31;
                    break;
                case "KEYCODE_D":
                case 32:
                    message.keyCode = 32;
                    break;
                case "KEYCODE_E":
                case 33:
                    message.keyCode = 33;
                    break;
                case "KEYCODE_F":
                case 34:
                    message.keyCode = 34;
                    break;
                case "KEYCODE_G":
                case 35:
                    message.keyCode = 35;
                    break;
                case "KEYCODE_H":
                case 36:
                    message.keyCode = 36;
                    break;
                case "KEYCODE_I":
                case 37:
                    message.keyCode = 37;
                    break;
                case "KEYCODE_J":
                case 38:
                    message.keyCode = 38;
                    break;
                case "KEYCODE_K":
                case 39:
                    message.keyCode = 39;
                    break;
                case "KEYCODE_L":
                case 40:
                    message.keyCode = 40;
                    break;
                case "KEYCODE_M":
                case 41:
                    message.keyCode = 41;
                    break;
                case "KEYCODE_N":
                case 42:
                    message.keyCode = 42;
                    break;
                case "KEYCODE_O":
                case 43:
                    message.keyCode = 43;
                    break;
                case "KEYCODE_P":
                case 44:
                    message.keyCode = 44;
                    break;
                case "KEYCODE_Q":
                case 45:
                    message.keyCode = 45;
                    break;
                case "KEYCODE_R":
                case 46:
                    message.keyCode = 46;
                    break;
                case "KEYCODE_S":
                case 47:
                    message.keyCode = 47;
                    break;
                case "KEYCODE_T":
                case 48:
                    message.keyCode = 48;
                    break;
                case "KEYCODE_U":
                case 49:
                    message.keyCode = 49;
                    break;
                case "KEYCODE_V":
                case 50:
                    message.keyCode = 50;
                    break;
                case "KEYCODE_W":
                case 51:
                    message.keyCode = 51;
                    break;
                case "KEYCODE_X":
                case 52:
                    message.keyCode = 52;
                    break;
                case "KEYCODE_Y":
                case 53:
                    message.keyCode = 53;
                    break;
                case "KEYCODE_Z":
                case 54:
                    message.keyCode = 54;
                    break;
                case "KEYCODE_COMMA":
                case 55:
                    message.keyCode = 55;
                    break;
                case "KEYCODE_PERIOD":
                case 56:
                    message.keyCode = 56;
                    break;
                case "KEYCODE_ALT_LEFT":
                case 57:
                    message.keyCode = 57;
                    break;
                case "KEYCODE_ALT_RIGHT":
                case 58:
                    message.keyCode = 58;
                    break;
                case "KEYCODE_SHIFT_LEFT":
                case 59:
                    message.keyCode = 59;
                    break;
                case "KEYCODE_SHIFT_RIGHT":
                case 60:
                    message.keyCode = 60;
                    break;
                case "KEYCODE_TAB":
                case 61:
                    message.keyCode = 61;
                    break;
                case "KEYCODE_SPACE":
                case 62:
                    message.keyCode = 62;
                    break;
                case "KEYCODE_SYM":
                case 63:
                    message.keyCode = 63;
                    break;
                case "KEYCODE_EXPLORER":
                case 64:
                    message.keyCode = 64;
                    break;
                case "KEYCODE_ENVELOPE":
                case 65:
                    message.keyCode = 65;
                    break;
                case "KEYCODE_ENTER":
                case 66:
                    message.keyCode = 66;
                    break;
                case "KEYCODE_DEL":
                case 67:
                    message.keyCode = 67;
                    break;
                case "KEYCODE_GRAVE":
                case 68:
                    message.keyCode = 68;
                    break;
                case "KEYCODE_MINUS":
                case 69:
                    message.keyCode = 69;
                    break;
                case "KEYCODE_EQUALS":
                case 70:
                    message.keyCode = 70;
                    break;
                case "KEYCODE_LEFT_BRACKET":
                case 71:
                    message.keyCode = 71;
                    break;
                case "KEYCODE_RIGHT_BRACKET":
                case 72:
                    message.keyCode = 72;
                    break;
                case "KEYCODE_BACKSLASH":
                case 73:
                    message.keyCode = 73;
                    break;
                case "KEYCODE_SEMICOLON":
                case 74:
                    message.keyCode = 74;
                    break;
                case "KEYCODE_APOSTROPHE":
                case 75:
                    message.keyCode = 75;
                    break;
                case "KEYCODE_SLASH":
                case 76:
                    message.keyCode = 76;
                    break;
                case "KEYCODE_AT":
                case 77:
                    message.keyCode = 77;
                    break;
                case "KEYCODE_NUM":
                case 78:
                    message.keyCode = 78;
                    break;
                case "KEYCODE_HEADSETHOOK":
                case 79:
                    message.keyCode = 79;
                    break;
                case "KEYCODE_FOCUS":
                case 80:
                    message.keyCode = 80;
                    break;
                case "KEYCODE_PLUS":
                case 81:
                    message.keyCode = 81;
                    break;
                case "KEYCODE_MENU":
                case 82:
                    message.keyCode = 82;
                    break;
                case "KEYCODE_NOTIFICATION":
                case 83:
                    message.keyCode = 83;
                    break;
                case "KEYCODE_SEARCH":
                case 84:
                    message.keyCode = 84;
                    break;
                case "KEYCODE_MEDIA_PLAY_PAUSE":
                case 85:
                    message.keyCode = 85;
                    break;
                case "KEYCODE_MEDIA_STOP":
                case 86:
                    message.keyCode = 86;
                    break;
                case "KEYCODE_MEDIA_NEXT":
                case 87:
                    message.keyCode = 87;
                    break;
                case "KEYCODE_MEDIA_PREVIOUS":
                case 88:
                    message.keyCode = 88;
                    break;
                case "KEYCODE_MEDIA_REWIND":
                case 89:
                    message.keyCode = 89;
                    break;
                case "KEYCODE_MEDIA_FAST_FORWARD":
                case 90:
                    message.keyCode = 90;
                    break;
                case "KEYCODE_MUTE":
                case 91:
                    message.keyCode = 91;
                    break;
                case "KEYCODE_PAGE_UP":
                case 92:
                    message.keyCode = 92;
                    break;
                case "KEYCODE_PAGE_DOWN":
                case 93:
                    message.keyCode = 93;
                    break;
                case "KEYCODE_PICTSYMBOLS":
                case 94:
                    message.keyCode = 94;
                    break;
                case "KEYCODE_SWITCH_CHARSET":
                case 95:
                    message.keyCode = 95;
                    break;
                case "KEYCODE_BUTTON_A":
                case 96:
                    message.keyCode = 96;
                    break;
                case "KEYCODE_BUTTON_B":
                case 97:
                    message.keyCode = 97;
                    break;
                case "KEYCODE_BUTTON_C":
                case 98:
                    message.keyCode = 98;
                    break;
                case "KEYCODE_BUTTON_X":
                case 99:
                    message.keyCode = 99;
                    break;
                case "KEYCODE_BUTTON_Y":
                case 100:
                    message.keyCode = 100;
                    break;
                case "KEYCODE_BUTTON_Z":
                case 101:
                    message.keyCode = 101;
                    break;
                case "KEYCODE_BUTTON_L1":
                case 102:
                    message.keyCode = 102;
                    break;
                case "KEYCODE_BUTTON_R1":
                case 103:
                    message.keyCode = 103;
                    break;
                case "KEYCODE_BUTTON_L2":
                case 104:
                    message.keyCode = 104;
                    break;
                case "KEYCODE_BUTTON_R2":
                case 105:
                    message.keyCode = 105;
                    break;
                case "KEYCODE_BUTTON_THUMBL":
                case 106:
                    message.keyCode = 106;
                    break;
                case "KEYCODE_BUTTON_THUMBR":
                case 107:
                    message.keyCode = 107;
                    break;
                case "KEYCODE_BUTTON_START":
                case 108:
                    message.keyCode = 108;
                    break;
                case "KEYCODE_BUTTON_SELECT":
                case 109:
                    message.keyCode = 109;
                    break;
                case "KEYCODE_BUTTON_MODE":
                case 110:
                    message.keyCode = 110;
                    break;
                case "KEYCODE_ESCAPE":
                case 111:
                    message.keyCode = 111;
                    break;
                case "KEYCODE_FORWARD_DEL":
                case 112:
                    message.keyCode = 112;
                    break;
                case "KEYCODE_CTRL_LEFT":
                case 113:
                    message.keyCode = 113;
                    break;
                case "KEYCODE_CTRL_RIGHT":
                case 114:
                    message.keyCode = 114;
                    break;
                case "KEYCODE_CAPS_LOCK":
                case 115:
                    message.keyCode = 115;
                    break;
                case "KEYCODE_SCROLL_LOCK":
                case 116:
                    message.keyCode = 116;
                    break;
                case "KEYCODE_META_LEFT":
                case 117:
                    message.keyCode = 117;
                    break;
                case "KEYCODE_META_RIGHT":
                case 118:
                    message.keyCode = 118;
                    break;
                case "KEYCODE_FUNCTION":
                case 119:
                    message.keyCode = 119;
                    break;
                case "KEYCODE_SYSRQ":
                case 120:
                    message.keyCode = 120;
                    break;
                case "KEYCODE_BREAK":
                case 121:
                    message.keyCode = 121;
                    break;
                case "KEYCODE_MOVE_HOME":
                case 122:
                    message.keyCode = 122;
                    break;
                case "KEYCODE_MOVE_END":
                case 123:
                    message.keyCode = 123;
                    break;
                case "KEYCODE_INSERT":
                case 124:
                    message.keyCode = 124;
                    break;
                case "KEYCODE_FORWARD":
                case 125:
                    message.keyCode = 125;
                    break;
                case "KEYCODE_MEDIA_PLAY":
                case 126:
                    message.keyCode = 126;
                    break;
                case "KEYCODE_MEDIA_PAUSE":
                case 127:
                    message.keyCode = 127;
                    break;
                case "KEYCODE_MEDIA_CLOSE":
                case 128:
                    message.keyCode = 128;
                    break;
                case "KEYCODE_MEDIA_EJECT":
                case 129:
                    message.keyCode = 129;
                    break;
                case "KEYCODE_MEDIA_RECORD":
                case 130:
                    message.keyCode = 130;
                    break;
                case "KEYCODE_F1":
                case 131:
                    message.keyCode = 131;
                    break;
                case "KEYCODE_F2":
                case 132:
                    message.keyCode = 132;
                    break;
                case "KEYCODE_F3":
                case 133:
                    message.keyCode = 133;
                    break;
                case "KEYCODE_F4":
                case 134:
                    message.keyCode = 134;
                    break;
                case "KEYCODE_F5":
                case 135:
                    message.keyCode = 135;
                    break;
                case "KEYCODE_F6":
                case 136:
                    message.keyCode = 136;
                    break;
                case "KEYCODE_F7":
                case 137:
                    message.keyCode = 137;
                    break;
                case "KEYCODE_F8":
                case 138:
                    message.keyCode = 138;
                    break;
                case "KEYCODE_F9":
                case 139:
                    message.keyCode = 139;
                    break;
                case "KEYCODE_F10":
                case 140:
                    message.keyCode = 140;
                    break;
                case "KEYCODE_F11":
                case 141:
                    message.keyCode = 141;
                    break;
                case "KEYCODE_F12":
                case 142:
                    message.keyCode = 142;
                    break;
                case "KEYCODE_NUM_LOCK":
                case 143:
                    message.keyCode = 143;
                    break;
                case "KEYCODE_NUMPAD_0":
                case 144:
                    message.keyCode = 144;
                    break;
                case "KEYCODE_NUMPAD_1":
                case 145:
                    message.keyCode = 145;
                    break;
                case "KEYCODE_NUMPAD_2":
                case 146:
                    message.keyCode = 146;
                    break;
                case "KEYCODE_NUMPAD_3":
                case 147:
                    message.keyCode = 147;
                    break;
                case "KEYCODE_NUMPAD_4":
                case 148:
                    message.keyCode = 148;
                    break;
                case "KEYCODE_NUMPAD_5":
                case 149:
                    message.keyCode = 149;
                    break;
                case "KEYCODE_NUMPAD_6":
                case 150:
                    message.keyCode = 150;
                    break;
                case "KEYCODE_NUMPAD_7":
                case 151:
                    message.keyCode = 151;
                    break;
                case "KEYCODE_NUMPAD_8":
                case 152:
                    message.keyCode = 152;
                    break;
                case "KEYCODE_NUMPAD_9":
                case 153:
                    message.keyCode = 153;
                    break;
                case "KEYCODE_NUMPAD_DIVIDE":
                case 154:
                    message.keyCode = 154;
                    break;
                case "KEYCODE_NUMPAD_MULTIPLY":
                case 155:
                    message.keyCode = 155;
                    break;
                case "KEYCODE_NUMPAD_SUBTRACT":
                case 156:
                    message.keyCode = 156;
                    break;
                case "KEYCODE_NUMPAD_ADD":
                case 157:
                    message.keyCode = 157;
                    break;
                case "KEYCODE_NUMPAD_DOT":
                case 158:
                    message.keyCode = 158;
                    break;
                case "KEYCODE_NUMPAD_COMMA":
                case 159:
                    message.keyCode = 159;
                    break;
                case "KEYCODE_NUMPAD_ENTER":
                case 160:
                    message.keyCode = 160;
                    break;
                case "KEYCODE_NUMPAD_EQUALS":
                case 161:
                    message.keyCode = 161;
                    break;
                case "KEYCODE_NUMPAD_LEFT_PAREN":
                case 162:
                    message.keyCode = 162;
                    break;
                case "KEYCODE_NUMPAD_RIGHT_PAREN":
                case 163:
                    message.keyCode = 163;
                    break;
                case "KEYCODE_VOLUME_MUTE":
                case 164:
                    message.keyCode = 164;
                    break;
                case "KEYCODE_INFO":
                case 165:
                    message.keyCode = 165;
                    break;
                case "KEYCODE_CHANNEL_UP":
                case 166:
                    message.keyCode = 166;
                    break;
                case "KEYCODE_CHANNEL_DOWN":
                case 167:
                    message.keyCode = 167;
                    break;
                case "KEYCODE_ZOOM_IN":
                case 168:
                    message.keyCode = 168;
                    break;
                case "KEYCODE_ZOOM_OUT":
                case 169:
                    message.keyCode = 169;
                    break;
                case "KEYCODE_TV":
                case 170:
                    message.keyCode = 170;
                    break;
                case "KEYCODE_WINDOW":
                case 171:
                    message.keyCode = 171;
                    break;
                case "KEYCODE_GUIDE":
                case 172:
                    message.keyCode = 172;
                    break;
                case "KEYCODE_DVR":
                case 173:
                    message.keyCode = 173;
                    break;
                case "KEYCODE_BOOKMARK":
                case 174:
                    message.keyCode = 174;
                    break;
                case "KEYCODE_CAPTIONS":
                case 175:
                    message.keyCode = 175;
                    break;
                case "KEYCODE_SETTINGS":
                case 176:
                    message.keyCode = 176;
                    break;
                case "KEYCODE_TV_POWER":
                case 177:
                    message.keyCode = 177;
                    break;
                case "KEYCODE_TV_INPUT":
                case 178:
                    message.keyCode = 178;
                    break;
                case "KEYCODE_STB_POWER":
                case 179:
                    message.keyCode = 179;
                    break;
                case "KEYCODE_STB_INPUT":
                case 180:
                    message.keyCode = 180;
                    break;
                case "KEYCODE_AVR_POWER":
                case 181:
                    message.keyCode = 181;
                    break;
                case "KEYCODE_AVR_INPUT":
                case 182:
                    message.keyCode = 182;
                    break;
                case "KEYCODE_PROG_RED":
                case 183:
                    message.keyCode = 183;
                    break;
                case "KEYCODE_PROG_GREEN":
                case 184:
                    message.keyCode = 184;
                    break;
                case "KEYCODE_PROG_YELLOW":
                case 185:
                    message.keyCode = 185;
                    break;
                case "KEYCODE_PROG_BLUE":
                case 186:
                    message.keyCode = 186;
                    break;
                case "KEYCODE_APP_SWITCH":
                case 187:
                    message.keyCode = 187;
                    break;
                case "KEYCODE_BUTTON_1":
                case 188:
                    message.keyCode = 188;
                    break;
                case "KEYCODE_BUTTON_2":
                case 189:
                    message.keyCode = 189;
                    break;
                case "KEYCODE_BUTTON_3":
                case 190:
                    message.keyCode = 190;
                    break;
                case "KEYCODE_BUTTON_4":
                case 191:
                    message.keyCode = 191;
                    break;
                case "KEYCODE_BUTTON_5":
                case 192:
                    message.keyCode = 192;
                    break;
                case "KEYCODE_BUTTON_6":
                case 193:
                    message.keyCode = 193;
                    break;
                case "KEYCODE_BUTTON_7":
                case 194:
                    message.keyCode = 194;
                    break;
                case "KEYCODE_BUTTON_8":
                case 195:
                    message.keyCode = 195;
                    break;
                case "KEYCODE_BUTTON_9":
                case 196:
                    message.keyCode = 196;
                    break;
                case "KEYCODE_BUTTON_10":
                case 197:
                    message.keyCode = 197;
                    break;
                case "KEYCODE_BUTTON_11":
                case 198:
                    message.keyCode = 198;
                    break;
                case "KEYCODE_BUTTON_12":
                case 199:
                    message.keyCode = 199;
                    break;
                case "KEYCODE_BUTTON_13":
                case 200:
                    message.keyCode = 200;
                    break;
                case "KEYCODE_BUTTON_14":
                case 201:
                    message.keyCode = 201;
                    break;
                case "KEYCODE_BUTTON_15":
                case 202:
                    message.keyCode = 202;
                    break;
                case "KEYCODE_BUTTON_16":
                case 203:
                    message.keyCode = 203;
                    break;
                case "KEYCODE_LANGUAGE_SWITCH":
                case 204:
                    message.keyCode = 204;
                    break;
                case "KEYCODE_MANNER_MODE":
                case 205:
                    message.keyCode = 205;
                    break;
                case "KEYCODE_3D_MODE":
                case 206:
                    message.keyCode = 206;
                    break;
                case "KEYCODE_CONTACTS":
                case 207:
                    message.keyCode = 207;
                    break;
                case "KEYCODE_CALENDAR":
                case 208:
                    message.keyCode = 208;
                    break;
                case "KEYCODE_MUSIC":
                case 209:
                    message.keyCode = 209;
                    break;
                case "KEYCODE_CALCULATOR":
                case 210:
                    message.keyCode = 210;
                    break;
                case "KEYCODE_ZENKAKU_HANKAKU":
                case 211:
                    message.keyCode = 211;
                    break;
                case "KEYCODE_EISU":
                case 212:
                    message.keyCode = 212;
                    break;
                case "KEYCODE_MUHENKAN":
                case 213:
                    message.keyCode = 213;
                    break;
                case "KEYCODE_HENKAN":
                case 214:
                    message.keyCode = 214;
                    break;
                case "KEYCODE_KATAKANA_HIRAGANA":
                case 215:
                    message.keyCode = 215;
                    break;
                case "KEYCODE_YEN":
                case 216:
                    message.keyCode = 216;
                    break;
                case "KEYCODE_RO":
                case 217:
                    message.keyCode = 217;
                    break;
                case "KEYCODE_KANA":
                case 218:
                    message.keyCode = 218;
                    break;
                case "KEYCODE_ASSIST":
                case 219:
                    message.keyCode = 219;
                    break;
                case "KEYCODE_BRIGHTNESS_DOWN":
                case 220:
                    message.keyCode = 220;
                    break;
                case "KEYCODE_BRIGHTNESS_UP":
                case 221:
                    message.keyCode = 221;
                    break;
                case "KEYCODE_MEDIA_AUDIO_TRACK":
                case 222:
                    message.keyCode = 222;
                    break;
                case "KEYCODE_SLEEP":
                case 223:
                    message.keyCode = 223;
                    break;
                case "KEYCODE_WAKEUP":
                case 224:
                    message.keyCode = 224;
                    break;
                case "KEYCODE_PAIRING":
                case 225:
                    message.keyCode = 225;
                    break;
                case "KEYCODE_MEDIA_TOP_MENU":
                case 226:
                    message.keyCode = 226;
                    break;
                case "KEYCODE_11":
                case 227:
                    message.keyCode = 227;
                    break;
                case "KEYCODE_12":
                case 228:
                    message.keyCode = 228;
                    break;
                case "KEYCODE_LAST_CHANNEL":
                case 229:
                    message.keyCode = 229;
                    break;
                case "KEYCODE_TV_DATA_SERVICE":
                case 230:
                    message.keyCode = 230;
                    break;
                case "KEYCODE_VOICE_ASSIST":
                case 231:
                    message.keyCode = 231;
                    break;
                case "KEYCODE_TV_RADIO":
                case 232:
                    message.keyCode = 232;
                    break;
                case "KEYCODE_TV_TELETEXT":
                case 233:
                    message.keyCode = 233;
                    break;
                case "KEYCODE_TV_NUMBER_ENTRY":
                case 234:
                    message.keyCode = 234;
                    break;
                case "KEYCODE_TV_TERRESTRIAL_ANALOG":
                case 235:
                    message.keyCode = 235;
                    break;
                case "KEYCODE_TV_TERRESTRIAL_DIGITAL":
                case 236:
                    message.keyCode = 236;
                    break;
                case "KEYCODE_TV_SATELLITE":
                case 237:
                    message.keyCode = 237;
                    break;
                case "KEYCODE_TV_SATELLITE_BS":
                case 238:
                    message.keyCode = 238;
                    break;
                case "KEYCODE_TV_SATELLITE_CS":
                case 239:
                    message.keyCode = 239;
                    break;
                case "KEYCODE_TV_SATELLITE_SERVICE":
                case 240:
                    message.keyCode = 240;
                    break;
                case "KEYCODE_TV_NETWORK":
                case 241:
                    message.keyCode = 241;
                    break;
                case "KEYCODE_TV_ANTENNA_CABLE":
                case 242:
                    message.keyCode = 242;
                    break;
                case "KEYCODE_TV_INPUT_HDMI_1":
                case 243:
                    message.keyCode = 243;
                    break;
                case "KEYCODE_TV_INPUT_HDMI_2":
                case 244:
                    message.keyCode = 244;
                    break;
                case "KEYCODE_TV_INPUT_HDMI_3":
                case 245:
                    message.keyCode = 245;
                    break;
                case "KEYCODE_TV_INPUT_HDMI_4":
                case 246:
                    message.keyCode = 246;
                    break;
                case "KEYCODE_TV_INPUT_COMPOSITE_1":
                case 247:
                    message.keyCode = 247;
                    break;
                case "KEYCODE_TV_INPUT_COMPOSITE_2":
                case 248:
                    message.keyCode = 248;
                    break;
                case "KEYCODE_TV_INPUT_COMPONENT_1":
                case 249:
                    message.keyCode = 249;
                    break;
                case "KEYCODE_TV_INPUT_COMPONENT_2":
                case 250:
                    message.keyCode = 250;
                    break;
                case "KEYCODE_TV_INPUT_VGA_1":
                case 251:
                    message.keyCode = 251;
                    break;
                case "KEYCODE_TV_AUDIO_DESCRIPTION":
                case 252:
                    message.keyCode = 252;
                    break;
                case "KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP":
                case 253:
                    message.keyCode = 253;
                    break;
                case "KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN":
                case 254:
                    message.keyCode = 254;
                    break;
                case "KEYCODE_TV_ZOOM_MODE":
                case 255:
                    message.keyCode = 255;
                    break;
                case "KEYCODE_TV_CONTENTS_MENU":
                case 256:
                    message.keyCode = 256;
                    break;
                case "KEYCODE_TV_MEDIA_CONTEXT_MENU":
                case 257:
                    message.keyCode = 257;
                    break;
                case "KEYCODE_TV_TIMER_PROGRAMMING":
                case 258:
                    message.keyCode = 258;
                    break;
                case "KEYCODE_HELP":
                case 259:
                    message.keyCode = 259;
                    break;
                case "KEYCODE_NAVIGATE_PREVIOUS":
                case 260:
                    message.keyCode = 260;
                    break;
                case "KEYCODE_NAVIGATE_NEXT":
                case 261:
                    message.keyCode = 261;
                    break;
                case "KEYCODE_NAVIGATE_IN":
                case 262:
                    message.keyCode = 262;
                    break;
                case "KEYCODE_NAVIGATE_OUT":
                case 263:
                    message.keyCode = 263;
                    break;
                case "KEYCODE_STEM_PRIMARY":
                case 264:
                    message.keyCode = 264;
                    break;
                case "KEYCODE_STEM_1":
                case 265:
                    message.keyCode = 265;
                    break;
                case "KEYCODE_STEM_2":
                case 266:
                    message.keyCode = 266;
                    break;
                case "KEYCODE_STEM_3":
                case 267:
                    message.keyCode = 267;
                    break;
                case "KEYCODE_DPAD_UP_LEFT":
                case 268:
                    message.keyCode = 268;
                    break;
                case "KEYCODE_DPAD_DOWN_LEFT":
                case 269:
                    message.keyCode = 269;
                    break;
                case "KEYCODE_DPAD_UP_RIGHT":
                case 270:
                    message.keyCode = 270;
                    break;
                case "KEYCODE_DPAD_DOWN_RIGHT":
                case 271:
                    message.keyCode = 271;
                    break;
                case "KEYCODE_MEDIA_SKIP_FORWARD":
                case 272:
                    message.keyCode = 272;
                    break;
                case "KEYCODE_MEDIA_SKIP_BACKWARD":
                case 273:
                    message.keyCode = 273;
                    break;
                case "KEYCODE_MEDIA_STEP_FORWARD":
                case 274:
                    message.keyCode = 274;
                    break;
                case "KEYCODE_MEDIA_STEP_BACKWARD":
                case 275:
                    message.keyCode = 275;
                    break;
                case "KEYCODE_SOFT_SLEEP":
                case 276:
                    message.keyCode = 276;
                    break;
                case "KEYCODE_CUT":
                case 277:
                    message.keyCode = 277;
                    break;
                case "KEYCODE_COPY":
                case 278:
                    message.keyCode = 278;
                    break;
                case "KEYCODE_PASTE":
                case 279:
                    message.keyCode = 279;
                    break;
                case "KEYCODE_SYSTEM_NAVIGATION_UP":
                case 280:
                    message.keyCode = 280;
                    break;
                case "KEYCODE_SYSTEM_NAVIGATION_DOWN":
                case 281:
                    message.keyCode = 281;
                    break;
                case "KEYCODE_SYSTEM_NAVIGATION_LEFT":
                case 282:
                    message.keyCode = 282;
                    break;
                case "KEYCODE_SYSTEM_NAVIGATION_RIGHT":
                case 283:
                    message.keyCode = 283;
                    break;
                case "KEYCODE_ALL_APPS":
                case 284:
                    message.keyCode = 284;
                    break;
                case "KEYCODE_REFRESH":
                case 285:
                    message.keyCode = 285;
                    break;
                case "KEYCODE_THUMBS_UP":
                case 286:
                    message.keyCode = 286;
                    break;
                case "KEYCODE_THUMBS_DOWN":
                case 287:
                    message.keyCode = 287;
                    break;
                case "KEYCODE_PROFILE_SWITCH":
                case 288:
                    message.keyCode = 288;
                    break;
                case "KEYCODE_VIDEO_APP_1":
                case 289:
                    message.keyCode = 289;
                    break;
                case "KEYCODE_VIDEO_APP_2":
                case 290:
                    message.keyCode = 290;
                    break;
                case "KEYCODE_VIDEO_APP_3":
                case 291:
                    message.keyCode = 291;
                    break;
                case "KEYCODE_VIDEO_APP_4":
                case 292:
                    message.keyCode = 292;
                    break;
                case "KEYCODE_VIDEO_APP_5":
                case 293:
                    message.keyCode = 293;
                    break;
                case "KEYCODE_VIDEO_APP_6":
                case 294:
                    message.keyCode = 294;
                    break;
                case "KEYCODE_VIDEO_APP_7":
                case 295:
                    message.keyCode = 295;
                    break;
                case "KEYCODE_VIDEO_APP_8":
                case 296:
                    message.keyCode = 296;
                    break;
                case "KEYCODE_FEATURED_APP_1":
                case 297:
                    message.keyCode = 297;
                    break;
                case "KEYCODE_FEATURED_APP_2":
                case 298:
                    message.keyCode = 298;
                    break;
                case "KEYCODE_FEATURED_APP_3":
                case 299:
                    message.keyCode = 299;
                    break;
                case "KEYCODE_FEATURED_APP_4":
                case 300:
                    message.keyCode = 300;
                    break;
                case "KEYCODE_DEMO_APP_1":
                case 301:
                    message.keyCode = 301;
                    break;
                case "KEYCODE_DEMO_APP_2":
                case 302:
                    message.keyCode = 302;
                    break;
                case "KEYCODE_DEMO_APP_3":
                case 303:
                    message.keyCode = 303;
                    break;
                case "KEYCODE_DEMO_APP_4":
                case 304:
                    message.keyCode = 304;
                    break;
                default:
                    if (typeof object.keyCode === "number" && (object.keyCode | 0) === object.keyCode)
                        message.keyCode = object.keyCode;
                }
            if (object.direction !== 0 && (typeof object.direction !== "string" || $root.remote.RemoteDirection[object.direction] !== 0))
                switch (object.direction) {
                case "UNKNOWN_DIRECTION":
                case 0:
                    message.direction = 0;
                    break;
                case "START_LONG":
                case 1:
                    message.direction = 1;
                    break;
                case "END_LONG":
                case 2:
                    message.direction = 2;
                    break;
                case "SHORT":
                case 3:
                    message.direction = 3;
                    break;
                default:
                    if (typeof object.direction === "number" && (object.direction | 0) === object.direction)
                        message.direction = object.direction;
                }
            return message;
        };

        /**
         * Creates a plain object from a RemoteKeyInject message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteKeyInject
         * @static
         * @param {remote.RemoteKeyInject} message RemoteKeyInject
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteKeyInject.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.keyCode = options.enums === $String ? "KEYCODE_UNKNOWN" : 0;
                object.direction = options.enums === $String ? "UNKNOWN_DIRECTION" : 0;
            }
            if (message.keyCode != null && $Object.hasOwnProperty.call(message, "keyCode"))
                object.keyCode = options.enums === $String ? $root.remote.RemoteKeyCode[message.keyCode] === $undefined ? message.keyCode : $root.remote.RemoteKeyCode[message.keyCode] : message.keyCode;
            if (message.direction != null && $Object.hasOwnProperty.call(message, "direction"))
                object.direction = options.enums === $String ? $root.remote.RemoteDirection[message.direction] === $undefined ? message.direction : $root.remote.RemoteDirection[message.direction] : message.direction;
            return object;
        };

        /**
         * Converts this RemoteKeyInject to JSON.
         * @function toJSON
         * @memberof remote.RemoteKeyInject
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteKeyInject.prototype.toJSON = function() {
            return RemoteKeyInject.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteKeyInject
         * @function getTypeUrl
         * @memberof remote.RemoteKeyInject
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteKeyInject.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteKeyInject";
        };

        return RemoteKeyInject;
    })();

    remote.RemotePingResponse = (function() {

        /**
         * Properties of a RemotePingResponse.
         * @typedef {Object} remote.RemotePingResponse.$Properties
         * @property {number|null} [val1] RemotePingResponse val1
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemotePingResponse.
         * @memberof remote
         * @interface IRemotePingResponse
         * @augments remote.RemotePingResponse.$Properties
         * @deprecated Use remote.RemotePingResponse.$Properties instead.
         */

        /**
         * Shape of a RemotePingResponse.
         * @typedef {remote.RemotePingResponse.$Properties} remote.RemotePingResponse.$Shape
         */

        /**
         * Constructs a new RemotePingResponse.
         * @memberof remote
         * @classdesc Represents a RemotePingResponse.
         * @constructor
         * @param {remote.RemotePingResponse.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemotePingResponse = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemotePingResponse val1.
         * @member {number} val1
         * @memberof remote.RemotePingResponse
         * @instance
         */
        RemotePingResponse.prototype.val1 = 0;

        /**
         * Creates a new RemotePingResponse instance using the specified properties.
         * @function create
         * @memberof remote.RemotePingResponse
         * @static
         * @param {remote.RemotePingResponse.$Properties=} [properties] Properties to set
         * @returns {remote.RemotePingResponse} RemotePingResponse instance
         * @type {{
         *   (properties: remote.RemotePingResponse.$Shape): remote.RemotePingResponse & remote.RemotePingResponse.$Shape;
         *   (properties?: remote.RemotePingResponse.$Properties): remote.RemotePingResponse;
         * }}
         */
        RemotePingResponse.create = function(properties) {
            return new RemotePingResponse(properties);
        };

        /**
         * Encodes the specified RemotePingResponse message. Does not implicitly {@link remote.RemotePingResponse.verify|verify} messages.
         * @function encode
         * @memberof remote.RemotePingResponse
         * @static
         * @param {remote.RemotePingResponse.$Properties} message RemotePingResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemotePingResponse.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.val1 != null && $Object.hasOwnProperty.call(message, "val1") && message.val1 !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.val1);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemotePingResponse message, length delimited. Does not implicitly {@link remote.RemotePingResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemotePingResponse
         * @static
         * @param {remote.RemotePingResponse.$Properties} message RemotePingResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemotePingResponse.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemotePingResponse message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemotePingResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemotePingResponse & remote.RemotePingResponse.$Shape} RemotePingResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemotePingResponse.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemotePingResponse(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.val1 = value;
                        else
                            delete message.val1;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemotePingResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemotePingResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemotePingResponse & remote.RemotePingResponse.$Shape} RemotePingResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemotePingResponse.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemotePingResponse message.
         * @function verify
         * @memberof remote.RemotePingResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemotePingResponse.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.val1 != null && $Object.hasOwnProperty.call(message, "val1"))
                if (!$util.isInteger(message.val1))
                    return "val1: integer expected";
            return null;
        };

        /**
         * Creates a RemotePingResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemotePingResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemotePingResponse} RemotePingResponse
         */
        RemotePingResponse.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemotePingResponse)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemotePingResponse: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemotePingResponse();
            if (object.val1 != null)
                if ($Number(object.val1) !== 0)
                    message.val1 = object.val1 | 0;
            return message;
        };

        /**
         * Creates a plain object from a RemotePingResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemotePingResponse
         * @static
         * @param {remote.RemotePingResponse} message RemotePingResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemotePingResponse.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults)
                object.val1 = 0;
            if (message.val1 != null && $Object.hasOwnProperty.call(message, "val1"))
                object.val1 = message.val1;
            return object;
        };

        /**
         * Converts this RemotePingResponse to JSON.
         * @function toJSON
         * @memberof remote.RemotePingResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemotePingResponse.prototype.toJSON = function() {
            return RemotePingResponse.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemotePingResponse
         * @function getTypeUrl
         * @memberof remote.RemotePingResponse
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemotePingResponse.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemotePingResponse";
        };

        return RemotePingResponse;
    })();

    remote.RemotePingRequest = (function() {

        /**
         * Properties of a RemotePingRequest.
         * @typedef {Object} remote.RemotePingRequest.$Properties
         * @property {number|null} [val1] RemotePingRequest val1
         * @property {number|null} [val2] RemotePingRequest val2
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemotePingRequest.
         * @memberof remote
         * @interface IRemotePingRequest
         * @augments remote.RemotePingRequest.$Properties
         * @deprecated Use remote.RemotePingRequest.$Properties instead.
         */

        /**
         * Shape of a RemotePingRequest.
         * @typedef {remote.RemotePingRequest.$Properties} remote.RemotePingRequest.$Shape
         */

        /**
         * Constructs a new RemotePingRequest.
         * @memberof remote
         * @classdesc Represents a RemotePingRequest.
         * @constructor
         * @param {remote.RemotePingRequest.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemotePingRequest = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemotePingRequest val1.
         * @member {number} val1
         * @memberof remote.RemotePingRequest
         * @instance
         */
        RemotePingRequest.prototype.val1 = 0;

        /**
         * RemotePingRequest val2.
         * @member {number} val2
         * @memberof remote.RemotePingRequest
         * @instance
         */
        RemotePingRequest.prototype.val2 = 0;

        /**
         * Creates a new RemotePingRequest instance using the specified properties.
         * @function create
         * @memberof remote.RemotePingRequest
         * @static
         * @param {remote.RemotePingRequest.$Properties=} [properties] Properties to set
         * @returns {remote.RemotePingRequest} RemotePingRequest instance
         * @type {{
         *   (properties: remote.RemotePingRequest.$Shape): remote.RemotePingRequest & remote.RemotePingRequest.$Shape;
         *   (properties?: remote.RemotePingRequest.$Properties): remote.RemotePingRequest;
         * }}
         */
        RemotePingRequest.create = function(properties) {
            return new RemotePingRequest(properties);
        };

        /**
         * Encodes the specified RemotePingRequest message. Does not implicitly {@link remote.RemotePingRequest.verify|verify} messages.
         * @function encode
         * @memberof remote.RemotePingRequest
         * @static
         * @param {remote.RemotePingRequest.$Properties} message RemotePingRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemotePingRequest.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.val1 != null && $Object.hasOwnProperty.call(message, "val1") && message.val1 !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.val1);
            if (message.val2 != null && $Object.hasOwnProperty.call(message, "val2") && message.val2 !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.val2);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemotePingRequest message, length delimited. Does not implicitly {@link remote.RemotePingRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemotePingRequest
         * @static
         * @param {remote.RemotePingRequest.$Properties} message RemotePingRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemotePingRequest.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemotePingRequest message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemotePingRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemotePingRequest & remote.RemotePingRequest.$Shape} RemotePingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemotePingRequest.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemotePingRequest(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.val1 = value;
                        else
                            delete message.val1;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.val2 = value;
                        else
                            delete message.val2;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemotePingRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemotePingRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemotePingRequest & remote.RemotePingRequest.$Shape} RemotePingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemotePingRequest.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemotePingRequest message.
         * @function verify
         * @memberof remote.RemotePingRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemotePingRequest.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.val1 != null && $Object.hasOwnProperty.call(message, "val1"))
                if (!$util.isInteger(message.val1))
                    return "val1: integer expected";
            if (message.val2 != null && $Object.hasOwnProperty.call(message, "val2"))
                if (!$util.isInteger(message.val2))
                    return "val2: integer expected";
            return null;
        };

        /**
         * Creates a RemotePingRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemotePingRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemotePingRequest} RemotePingRequest
         */
        RemotePingRequest.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemotePingRequest)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemotePingRequest: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemotePingRequest();
            if (object.val1 != null)
                if ($Number(object.val1) !== 0)
                    message.val1 = object.val1 | 0;
            if (object.val2 != null)
                if ($Number(object.val2) !== 0)
                    message.val2 = object.val2 | 0;
            return message;
        };

        /**
         * Creates a plain object from a RemotePingRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemotePingRequest
         * @static
         * @param {remote.RemotePingRequest} message RemotePingRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemotePingRequest.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.val1 = 0;
                object.val2 = 0;
            }
            if (message.val1 != null && $Object.hasOwnProperty.call(message, "val1"))
                object.val1 = message.val1;
            if (message.val2 != null && $Object.hasOwnProperty.call(message, "val2"))
                object.val2 = message.val2;
            return object;
        };

        /**
         * Converts this RemotePingRequest to JSON.
         * @function toJSON
         * @memberof remote.RemotePingRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemotePingRequest.prototype.toJSON = function() {
            return RemotePingRequest.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemotePingRequest
         * @function getTypeUrl
         * @memberof remote.RemotePingRequest
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemotePingRequest.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemotePingRequest";
        };

        return RemotePingRequest;
    })();

    remote.RemoteSetActive = (function() {

        /**
         * Properties of a RemoteSetActive.
         * @typedef {Object} remote.RemoteSetActive.$Properties
         * @property {number|null} [active] RemoteSetActive active
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteSetActive.
         * @memberof remote
         * @interface IRemoteSetActive
         * @augments remote.RemoteSetActive.$Properties
         * @deprecated Use remote.RemoteSetActive.$Properties instead.
         */

        /**
         * Shape of a RemoteSetActive.
         * @typedef {remote.RemoteSetActive.$Properties} remote.RemoteSetActive.$Shape
         */

        /**
         * Constructs a new RemoteSetActive.
         * @memberof remote
         * @classdesc Represents a RemoteSetActive.
         * @constructor
         * @param {remote.RemoteSetActive.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteSetActive = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteSetActive active.
         * @member {number} active
         * @memberof remote.RemoteSetActive
         * @instance
         */
        RemoteSetActive.prototype.active = 0;

        /**
         * Creates a new RemoteSetActive instance using the specified properties.
         * @function create
         * @memberof remote.RemoteSetActive
         * @static
         * @param {remote.RemoteSetActive.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteSetActive} RemoteSetActive instance
         * @type {{
         *   (properties: remote.RemoteSetActive.$Shape): remote.RemoteSetActive & remote.RemoteSetActive.$Shape;
         *   (properties?: remote.RemoteSetActive.$Properties): remote.RemoteSetActive;
         * }}
         */
        RemoteSetActive.create = function(properties) {
            return new RemoteSetActive(properties);
        };

        /**
         * Encodes the specified RemoteSetActive message. Does not implicitly {@link remote.RemoteSetActive.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteSetActive
         * @static
         * @param {remote.RemoteSetActive.$Properties} message RemoteSetActive message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteSetActive.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.active != null && $Object.hasOwnProperty.call(message, "active") && message.active !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.active);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteSetActive message, length delimited. Does not implicitly {@link remote.RemoteSetActive.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteSetActive
         * @static
         * @param {remote.RemoteSetActive.$Properties} message RemoteSetActive message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteSetActive.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteSetActive message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteSetActive
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteSetActive & remote.RemoteSetActive.$Shape} RemoteSetActive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteSetActive.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteSetActive(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.active = value;
                        else
                            delete message.active;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteSetActive message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteSetActive
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteSetActive & remote.RemoteSetActive.$Shape} RemoteSetActive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteSetActive.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteSetActive message.
         * @function verify
         * @memberof remote.RemoteSetActive
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteSetActive.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.active != null && $Object.hasOwnProperty.call(message, "active"))
                if (!$util.isInteger(message.active))
                    return "active: integer expected";
            return null;
        };

        /**
         * Creates a RemoteSetActive message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteSetActive
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteSetActive} RemoteSetActive
         */
        RemoteSetActive.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteSetActive)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteSetActive: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteSetActive();
            if (object.active != null)
                if ($Number(object.active) !== 0)
                    message.active = object.active | 0;
            return message;
        };

        /**
         * Creates a plain object from a RemoteSetActive message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteSetActive
         * @static
         * @param {remote.RemoteSetActive} message RemoteSetActive
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteSetActive.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults)
                object.active = 0;
            if (message.active != null && $Object.hasOwnProperty.call(message, "active"))
                object.active = message.active;
            return object;
        };

        /**
         * Converts this RemoteSetActive to JSON.
         * @function toJSON
         * @memberof remote.RemoteSetActive
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteSetActive.prototype.toJSON = function() {
            return RemoteSetActive.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteSetActive
         * @function getTypeUrl
         * @memberof remote.RemoteSetActive
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteSetActive.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteSetActive";
        };

        return RemoteSetActive;
    })();

    remote.RemoteDeviceInfo = (function() {

        /**
         * Properties of a RemoteDeviceInfo.
         * @typedef {Object} remote.RemoteDeviceInfo.$Properties
         * @property {string|null} [model] RemoteDeviceInfo model
         * @property {string|null} [vendor] RemoteDeviceInfo vendor
         * @property {number|null} [unknown1] RemoteDeviceInfo unknown1
         * @property {string|null} [unknown2] RemoteDeviceInfo unknown2
         * @property {string|null} [packageName] RemoteDeviceInfo packageName
         * @property {string|null} [appVersion] RemoteDeviceInfo appVersion
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteDeviceInfo.
         * @memberof remote
         * @interface IRemoteDeviceInfo
         * @augments remote.RemoteDeviceInfo.$Properties
         * @deprecated Use remote.RemoteDeviceInfo.$Properties instead.
         */

        /**
         * Shape of a RemoteDeviceInfo.
         * @typedef {remote.RemoteDeviceInfo.$Properties} remote.RemoteDeviceInfo.$Shape
         */

        /**
         * Constructs a new RemoteDeviceInfo.
         * @memberof remote
         * @classdesc Represents a RemoteDeviceInfo.
         * @constructor
         * @param {remote.RemoteDeviceInfo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteDeviceInfo = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteDeviceInfo model.
         * @member {string} model
         * @memberof remote.RemoteDeviceInfo
         * @instance
         */
        RemoteDeviceInfo.prototype.model = "";

        /**
         * RemoteDeviceInfo vendor.
         * @member {string} vendor
         * @memberof remote.RemoteDeviceInfo
         * @instance
         */
        RemoteDeviceInfo.prototype.vendor = "";

        /**
         * RemoteDeviceInfo unknown1.
         * @member {number} unknown1
         * @memberof remote.RemoteDeviceInfo
         * @instance
         */
        RemoteDeviceInfo.prototype.unknown1 = 0;

        /**
         * RemoteDeviceInfo unknown2.
         * @member {string} unknown2
         * @memberof remote.RemoteDeviceInfo
         * @instance
         */
        RemoteDeviceInfo.prototype.unknown2 = "";

        /**
         * RemoteDeviceInfo packageName.
         * @member {string} packageName
         * @memberof remote.RemoteDeviceInfo
         * @instance
         */
        RemoteDeviceInfo.prototype.packageName = "";

        /**
         * RemoteDeviceInfo appVersion.
         * @member {string} appVersion
         * @memberof remote.RemoteDeviceInfo
         * @instance
         */
        RemoteDeviceInfo.prototype.appVersion = "";

        /**
         * Creates a new RemoteDeviceInfo instance using the specified properties.
         * @function create
         * @memberof remote.RemoteDeviceInfo
         * @static
         * @param {remote.RemoteDeviceInfo.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteDeviceInfo} RemoteDeviceInfo instance
         * @type {{
         *   (properties: remote.RemoteDeviceInfo.$Shape): remote.RemoteDeviceInfo & remote.RemoteDeviceInfo.$Shape;
         *   (properties?: remote.RemoteDeviceInfo.$Properties): remote.RemoteDeviceInfo;
         * }}
         */
        RemoteDeviceInfo.create = function(properties) {
            return new RemoteDeviceInfo(properties);
        };

        /**
         * Encodes the specified RemoteDeviceInfo message. Does not implicitly {@link remote.RemoteDeviceInfo.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteDeviceInfo
         * @static
         * @param {remote.RemoteDeviceInfo.$Properties} message RemoteDeviceInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteDeviceInfo.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.model != null && $Object.hasOwnProperty.call(message, "model") && message.model !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.model);
            if (message.vendor != null && $Object.hasOwnProperty.call(message, "vendor") && message.vendor !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.vendor);
            if (message.unknown1 != null && $Object.hasOwnProperty.call(message, "unknown1") && message.unknown1 !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.unknown1);
            if (message.unknown2 != null && $Object.hasOwnProperty.call(message, "unknown2") && message.unknown2 !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.unknown2);
            if (message.packageName != null && $Object.hasOwnProperty.call(message, "packageName") && message.packageName !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.packageName);
            if (message.appVersion != null && $Object.hasOwnProperty.call(message, "appVersion") && message.appVersion !== "")
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.appVersion);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteDeviceInfo message, length delimited. Does not implicitly {@link remote.RemoteDeviceInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteDeviceInfo
         * @static
         * @param {remote.RemoteDeviceInfo.$Properties} message RemoteDeviceInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteDeviceInfo.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteDeviceInfo message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteDeviceInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteDeviceInfo & remote.RemoteDeviceInfo.$Shape} RemoteDeviceInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteDeviceInfo.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteDeviceInfo(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.model = value;
                        else
                            delete message.model;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.vendor = value;
                        else
                            delete message.vendor;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.unknown1 = value;
                        else
                            delete message.unknown1;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.unknown2 = value;
                        else
                            delete message.unknown2;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.packageName = value;
                        else
                            delete message.packageName;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.appVersion = value;
                        else
                            delete message.appVersion;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteDeviceInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteDeviceInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteDeviceInfo & remote.RemoteDeviceInfo.$Shape} RemoteDeviceInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteDeviceInfo.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteDeviceInfo message.
         * @function verify
         * @memberof remote.RemoteDeviceInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteDeviceInfo.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.model != null && $Object.hasOwnProperty.call(message, "model"))
                if (!$util.isString(message.model))
                    return "model: string expected";
            if (message.vendor != null && $Object.hasOwnProperty.call(message, "vendor"))
                if (!$util.isString(message.vendor))
                    return "vendor: string expected";
            if (message.unknown1 != null && $Object.hasOwnProperty.call(message, "unknown1"))
                if (!$util.isInteger(message.unknown1))
                    return "unknown1: integer expected";
            if (message.unknown2 != null && $Object.hasOwnProperty.call(message, "unknown2"))
                if (!$util.isString(message.unknown2))
                    return "unknown2: string expected";
            if (message.packageName != null && $Object.hasOwnProperty.call(message, "packageName"))
                if (!$util.isString(message.packageName))
                    return "packageName: string expected";
            if (message.appVersion != null && $Object.hasOwnProperty.call(message, "appVersion"))
                if (!$util.isString(message.appVersion))
                    return "appVersion: string expected";
            return null;
        };

        /**
         * Creates a RemoteDeviceInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteDeviceInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteDeviceInfo} RemoteDeviceInfo
         */
        RemoteDeviceInfo.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteDeviceInfo)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteDeviceInfo: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteDeviceInfo();
            if (object.model != null)
                if (typeof object.model !== "string" || object.model.length)
                    message.model = $String(object.model);
            if (object.vendor != null)
                if (typeof object.vendor !== "string" || object.vendor.length)
                    message.vendor = $String(object.vendor);
            if (object.unknown1 != null)
                if ($Number(object.unknown1) !== 0)
                    message.unknown1 = object.unknown1 | 0;
            if (object.unknown2 != null)
                if (typeof object.unknown2 !== "string" || object.unknown2.length)
                    message.unknown2 = $String(object.unknown2);
            if (object.packageName != null)
                if (typeof object.packageName !== "string" || object.packageName.length)
                    message.packageName = $String(object.packageName);
            if (object.appVersion != null)
                if (typeof object.appVersion !== "string" || object.appVersion.length)
                    message.appVersion = $String(object.appVersion);
            return message;
        };

        /**
         * Creates a plain object from a RemoteDeviceInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteDeviceInfo
         * @static
         * @param {remote.RemoteDeviceInfo} message RemoteDeviceInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteDeviceInfo.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.model = "";
                object.vendor = "";
                object.unknown1 = 0;
                object.unknown2 = "";
                object.packageName = "";
                object.appVersion = "";
            }
            if (message.model != null && $Object.hasOwnProperty.call(message, "model"))
                object.model = message.model;
            if (message.vendor != null && $Object.hasOwnProperty.call(message, "vendor"))
                object.vendor = message.vendor;
            if (message.unknown1 != null && $Object.hasOwnProperty.call(message, "unknown1"))
                object.unknown1 = message.unknown1;
            if (message.unknown2 != null && $Object.hasOwnProperty.call(message, "unknown2"))
                object.unknown2 = message.unknown2;
            if (message.packageName != null && $Object.hasOwnProperty.call(message, "packageName"))
                object.packageName = message.packageName;
            if (message.appVersion != null && $Object.hasOwnProperty.call(message, "appVersion"))
                object.appVersion = message.appVersion;
            return object;
        };

        /**
         * Converts this RemoteDeviceInfo to JSON.
         * @function toJSON
         * @memberof remote.RemoteDeviceInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteDeviceInfo.prototype.toJSON = function() {
            return RemoteDeviceInfo.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteDeviceInfo
         * @function getTypeUrl
         * @memberof remote.RemoteDeviceInfo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteDeviceInfo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteDeviceInfo";
        };

        return RemoteDeviceInfo;
    })();

    remote.RemoteConfigure = (function() {

        /**
         * Properties of a RemoteConfigure.
         * @typedef {Object} remote.RemoteConfigure.$Properties
         * @property {number|null} [code1] RemoteConfigure code1
         * @property {remote.RemoteDeviceInfo.$Properties|null} [deviceInfo] RemoteConfigure deviceInfo
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteConfigure.
         * @memberof remote
         * @interface IRemoteConfigure
         * @augments remote.RemoteConfigure.$Properties
         * @deprecated Use remote.RemoteConfigure.$Properties instead.
         */

        /**
         * Shape of a RemoteConfigure.
         * @typedef {remote.RemoteConfigure.$Properties} remote.RemoteConfigure.$Shape
         */

        /**
         * Constructs a new RemoteConfigure.
         * @memberof remote
         * @classdesc Represents a RemoteConfigure.
         * @constructor
         * @param {remote.RemoteConfigure.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteConfigure = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteConfigure code1.
         * @member {number} code1
         * @memberof remote.RemoteConfigure
         * @instance
         */
        RemoteConfigure.prototype.code1 = 0;

        /**
         * RemoteConfigure deviceInfo.
         * @member {remote.RemoteDeviceInfo.$Properties|null|undefined} deviceInfo
         * @memberof remote.RemoteConfigure
         * @instance
         */
        RemoteConfigure.prototype.deviceInfo = null;

        /**
         * Creates a new RemoteConfigure instance using the specified properties.
         * @function create
         * @memberof remote.RemoteConfigure
         * @static
         * @param {remote.RemoteConfigure.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteConfigure} RemoteConfigure instance
         * @type {{
         *   (properties: remote.RemoteConfigure.$Shape): remote.RemoteConfigure & remote.RemoteConfigure.$Shape;
         *   (properties?: remote.RemoteConfigure.$Properties): remote.RemoteConfigure;
         * }}
         */
        RemoteConfigure.create = function(properties) {
            return new RemoteConfigure(properties);
        };

        /**
         * Encodes the specified RemoteConfigure message. Does not implicitly {@link remote.RemoteConfigure.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteConfigure
         * @static
         * @param {remote.RemoteConfigure.$Properties} message RemoteConfigure message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteConfigure.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.code1 != null && $Object.hasOwnProperty.call(message, "code1") && message.code1 !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code1);
            if (message.deviceInfo != null && $Object.hasOwnProperty.call(message, "deviceInfo"))
                $root.remote.RemoteDeviceInfo.encode(message.deviceInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteConfigure message, length delimited. Does not implicitly {@link remote.RemoteConfigure.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteConfigure
         * @static
         * @param {remote.RemoteConfigure.$Properties} message RemoteConfigure message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteConfigure.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteConfigure message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteConfigure
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteConfigure & remote.RemoteConfigure.$Shape} RemoteConfigure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteConfigure.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteConfigure(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.code1 = value;
                        else
                            delete message.code1;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.deviceInfo = $root.remote.RemoteDeviceInfo.decode(reader, reader.uint32(), $undefined, _depth + 1, message.deviceInfo);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteConfigure message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteConfigure
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteConfigure & remote.RemoteConfigure.$Shape} RemoteConfigure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteConfigure.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteConfigure message.
         * @function verify
         * @memberof remote.RemoteConfigure
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteConfigure.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.code1 != null && $Object.hasOwnProperty.call(message, "code1"))
                if (!$util.isInteger(message.code1))
                    return "code1: integer expected";
            if (message.deviceInfo != null && $Object.hasOwnProperty.call(message, "deviceInfo")) {
                var error = $root.remote.RemoteDeviceInfo.verify(message.deviceInfo, _depth + 1);
                if (error)
                    return "deviceInfo." + error;
            }
            return null;
        };

        /**
         * Creates a RemoteConfigure message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteConfigure
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteConfigure} RemoteConfigure
         */
        RemoteConfigure.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteConfigure)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteConfigure: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteConfigure();
            if (object.code1 != null)
                if ($Number(object.code1) !== 0)
                    message.code1 = object.code1 | 0;
            if (object.deviceInfo != null) {
                if (!$util.isObject(object.deviceInfo))
                    throw $TypeError(".remote.RemoteConfigure.deviceInfo: object expected");
                message.deviceInfo = $root.remote.RemoteDeviceInfo.fromObject(object.deviceInfo, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a RemoteConfigure message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteConfigure
         * @static
         * @param {remote.RemoteConfigure} message RemoteConfigure
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteConfigure.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.code1 = 0;
                object.deviceInfo = null;
            }
            if (message.code1 != null && $Object.hasOwnProperty.call(message, "code1"))
                object.code1 = message.code1;
            if (message.deviceInfo != null && $Object.hasOwnProperty.call(message, "deviceInfo"))
                object.deviceInfo = $root.remote.RemoteDeviceInfo.toObject(message.deviceInfo, options, _depth + 1);
            return object;
        };

        /**
         * Converts this RemoteConfigure to JSON.
         * @function toJSON
         * @memberof remote.RemoteConfigure
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteConfigure.prototype.toJSON = function() {
            return RemoteConfigure.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteConfigure
         * @function getTypeUrl
         * @memberof remote.RemoteConfigure
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteConfigure.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteConfigure";
        };

        return RemoteConfigure;
    })();

    remote.RemoteError = (function() {

        /**
         * Properties of a RemoteError.
         * @typedef {Object} remote.RemoteError.$Properties
         * @property {boolean|null} [value] RemoteError value
         * @property {remote.RemoteMessage.$Properties|null} [message] RemoteError message
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteError.
         * @memberof remote
         * @interface IRemoteError
         * @augments remote.RemoteError.$Properties
         * @deprecated Use remote.RemoteError.$Properties instead.
         */

        /**
         * Shape of a RemoteError.
         * @typedef {remote.RemoteError.$Properties} remote.RemoteError.$Shape
         */

        /**
         * Constructs a new RemoteError.
         * @memberof remote
         * @classdesc Represents a RemoteError.
         * @constructor
         * @param {remote.RemoteError.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteError = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteError value.
         * @member {boolean} value
         * @memberof remote.RemoteError
         * @instance
         */
        RemoteError.prototype.value = false;

        /**
         * RemoteError message.
         * @member {remote.RemoteMessage.$Properties|null|undefined} message
         * @memberof remote.RemoteError
         * @instance
         */
        RemoteError.prototype.message = null;

        /**
         * Creates a new RemoteError instance using the specified properties.
         * @function create
         * @memberof remote.RemoteError
         * @static
         * @param {remote.RemoteError.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteError} RemoteError instance
         * @type {{
         *   (properties: remote.RemoteError.$Shape): remote.RemoteError & remote.RemoteError.$Shape;
         *   (properties?: remote.RemoteError.$Properties): remote.RemoteError;
         * }}
         */
        RemoteError.create = function(properties) {
            return new RemoteError(properties);
        };

        /**
         * Encodes the specified RemoteError message. Does not implicitly {@link remote.RemoteError.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteError
         * @static
         * @param {remote.RemoteError.$Properties} message RemoteError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteError.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.value != null && $Object.hasOwnProperty.call(message, "value") && message.value !== false)
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.value);
            if (message.message != null && $Object.hasOwnProperty.call(message, "message"))
                $root.remote.RemoteMessage.encode(message.message, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteError message, length delimited. Does not implicitly {@link remote.RemoteError.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteError
         * @static
         * @param {remote.RemoteError.$Properties} message RemoteError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteError.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteError message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteError & remote.RemoteError.$Shape} RemoteError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteError.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteError(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.value = value;
                        else
                            delete message.value;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.message = $root.remote.RemoteMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.message);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteError message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteError & remote.RemoteError.$Shape} RemoteError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteError.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteError message.
         * @function verify
         * @memberof remote.RemoteError
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteError.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                if (typeof message.value !== "boolean")
                    return "value: boolean expected";
            if (message.message != null && $Object.hasOwnProperty.call(message, "message")) {
                var error = $root.remote.RemoteMessage.verify(message.message, _depth + 1);
                if (error)
                    return "message." + error;
            }
            return null;
        };

        /**
         * Creates a RemoteError message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteError
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteError} RemoteError
         */
        RemoteError.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteError)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteError: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteError();
            if (object.value != null)
                if (object.value)
                    message.value = $Boolean(object.value);
            if (object.message != null) {
                if (!$util.isObject(object.message))
                    throw $TypeError(".remote.RemoteError.message: object expected");
                message.message = $root.remote.RemoteMessage.fromObject(object.message, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a RemoteError message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteError
         * @static
         * @param {remote.RemoteError} message RemoteError
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteError.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.value = false;
                object.message = null;
            }
            if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            if (message.message != null && $Object.hasOwnProperty.call(message, "message"))
                object.message = $root.remote.RemoteMessage.toObject(message.message, options, _depth + 1);
            return object;
        };

        /**
         * Converts this RemoteError to JSON.
         * @function toJSON
         * @memberof remote.RemoteError
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteError.prototype.toJSON = function() {
            return RemoteError.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteError
         * @function getTypeUrl
         * @memberof remote.RemoteError
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteError.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteError";
        };

        return RemoteError;
    })();

    remote.RemoteMessage = (function() {

        /**
         * Properties of a RemoteMessage.
         * @typedef {Object} remote.RemoteMessage.$Properties
         * @property {remote.RemoteConfigure.$Properties|null} [remoteConfigure] RemoteMessage remoteConfigure
         * @property {remote.RemoteSetActive.$Properties|null} [remoteSetActive] RemoteMessage remoteSetActive
         * @property {remote.RemoteError.$Properties|null} [remoteError] RemoteMessage remoteError
         * @property {remote.RemotePingRequest.$Properties|null} [remotePingRequest] RemoteMessage remotePingRequest
         * @property {remote.RemotePingResponse.$Properties|null} [remotePingResponse] RemoteMessage remotePingResponse
         * @property {remote.RemoteKeyInject.$Properties|null} [remoteKeyInject] RemoteMessage remoteKeyInject
         * @property {remote.RemoteImeKeyInject.$Properties|null} [remoteImeKeyInject] RemoteMessage remoteImeKeyInject
         * @property {remote.RemoteImeBatchEdit.$Properties|null} [remoteImeBatchEdit] RemoteMessage remoteImeBatchEdit
         * @property {remote.RemoteImeShowRequest.$Properties|null} [remoteImeShowRequest] RemoteMessage remoteImeShowRequest
         * @property {remote.RemoteVoiceBegin.$Properties|null} [remoteVoiceBegin] RemoteMessage remoteVoiceBegin
         * @property {remote.RemoteVoicePayload.$Properties|null} [remoteVoicePayload] RemoteMessage remoteVoicePayload
         * @property {remote.RemoteVoiceEnd.$Properties|null} [remoteVoiceEnd] RemoteMessage remoteVoiceEnd
         * @property {remote.RemoteStart.$Properties|null} [remoteStart] RemoteMessage remoteStart
         * @property {remote.RemoteSetVolumeLevel.$Properties|null} [remoteSetVolumeLevel] RemoteMessage remoteSetVolumeLevel
         * @property {remote.RemoteAdjustVolumeLevel.$Properties|null} [remoteAdjustVolumeLevel] RemoteMessage remoteAdjustVolumeLevel
         * @property {remote.RemoteSetPreferredAudioDevice.$Properties|null} [remoteSetPreferredAudioDevice] RemoteMessage remoteSetPreferredAudioDevice
         * @property {remote.RemoteResetPreferredAudioDevice.$Properties|null} [remoteResetPreferredAudioDevice] RemoteMessage remoteResetPreferredAudioDevice
         * @property {remote.RemoteAppLinkLaunchRequest.$Properties|null} [remoteAppLinkLaunchRequest] RemoteMessage remoteAppLinkLaunchRequest
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RemoteMessage.
         * @memberof remote
         * @interface IRemoteMessage
         * @augments remote.RemoteMessage.$Properties
         * @deprecated Use remote.RemoteMessage.$Properties instead.
         */

        /**
         * Shape of a RemoteMessage.
         * @typedef {remote.RemoteMessage.$Properties} remote.RemoteMessage.$Shape
         */

        /**
         * Constructs a new RemoteMessage.
         * @memberof remote
         * @classdesc Represents a RemoteMessage.
         * @constructor
         * @param {remote.RemoteMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RemoteMessage = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RemoteMessage remoteConfigure.
         * @member {remote.RemoteConfigure.$Properties|null|undefined} remoteConfigure
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteConfigure = null;

        /**
         * RemoteMessage remoteSetActive.
         * @member {remote.RemoteSetActive.$Properties|null|undefined} remoteSetActive
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteSetActive = null;

        /**
         * RemoteMessage remoteError.
         * @member {remote.RemoteError.$Properties|null|undefined} remoteError
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteError = null;

        /**
         * RemoteMessage remotePingRequest.
         * @member {remote.RemotePingRequest.$Properties|null|undefined} remotePingRequest
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remotePingRequest = null;

        /**
         * RemoteMessage remotePingResponse.
         * @member {remote.RemotePingResponse.$Properties|null|undefined} remotePingResponse
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remotePingResponse = null;

        /**
         * RemoteMessage remoteKeyInject.
         * @member {remote.RemoteKeyInject.$Properties|null|undefined} remoteKeyInject
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteKeyInject = null;

        /**
         * RemoteMessage remoteImeKeyInject.
         * @member {remote.RemoteImeKeyInject.$Properties|null|undefined} remoteImeKeyInject
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteImeKeyInject = null;

        /**
         * RemoteMessage remoteImeBatchEdit.
         * @member {remote.RemoteImeBatchEdit.$Properties|null|undefined} remoteImeBatchEdit
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteImeBatchEdit = null;

        /**
         * RemoteMessage remoteImeShowRequest.
         * @member {remote.RemoteImeShowRequest.$Properties|null|undefined} remoteImeShowRequest
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteImeShowRequest = null;

        /**
         * RemoteMessage remoteVoiceBegin.
         * @member {remote.RemoteVoiceBegin.$Properties|null|undefined} remoteVoiceBegin
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteVoiceBegin = null;

        /**
         * RemoteMessage remoteVoicePayload.
         * @member {remote.RemoteVoicePayload.$Properties|null|undefined} remoteVoicePayload
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteVoicePayload = null;

        /**
         * RemoteMessage remoteVoiceEnd.
         * @member {remote.RemoteVoiceEnd.$Properties|null|undefined} remoteVoiceEnd
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteVoiceEnd = null;

        /**
         * RemoteMessage remoteStart.
         * @member {remote.RemoteStart.$Properties|null|undefined} remoteStart
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteStart = null;

        /**
         * RemoteMessage remoteSetVolumeLevel.
         * @member {remote.RemoteSetVolumeLevel.$Properties|null|undefined} remoteSetVolumeLevel
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteSetVolumeLevel = null;

        /**
         * RemoteMessage remoteAdjustVolumeLevel.
         * @member {remote.RemoteAdjustVolumeLevel.$Properties|null|undefined} remoteAdjustVolumeLevel
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteAdjustVolumeLevel = null;

        /**
         * RemoteMessage remoteSetPreferredAudioDevice.
         * @member {remote.RemoteSetPreferredAudioDevice.$Properties|null|undefined} remoteSetPreferredAudioDevice
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteSetPreferredAudioDevice = null;

        /**
         * RemoteMessage remoteResetPreferredAudioDevice.
         * @member {remote.RemoteResetPreferredAudioDevice.$Properties|null|undefined} remoteResetPreferredAudioDevice
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteResetPreferredAudioDevice = null;

        /**
         * RemoteMessage remoteAppLinkLaunchRequest.
         * @member {remote.RemoteAppLinkLaunchRequest.$Properties|null|undefined} remoteAppLinkLaunchRequest
         * @memberof remote.RemoteMessage
         * @instance
         */
        RemoteMessage.prototype.remoteAppLinkLaunchRequest = null;

        /**
         * Creates a new RemoteMessage instance using the specified properties.
         * @function create
         * @memberof remote.RemoteMessage
         * @static
         * @param {remote.RemoteMessage.$Properties=} [properties] Properties to set
         * @returns {remote.RemoteMessage} RemoteMessage instance
         * @type {{
         *   (properties: remote.RemoteMessage.$Shape): remote.RemoteMessage & remote.RemoteMessage.$Shape;
         *   (properties?: remote.RemoteMessage.$Properties): remote.RemoteMessage;
         * }}
         */
        RemoteMessage.create = function(properties) {
            return new RemoteMessage(properties);
        };

        /**
         * Encodes the specified RemoteMessage message. Does not implicitly {@link remote.RemoteMessage.verify|verify} messages.
         * @function encode
         * @memberof remote.RemoteMessage
         * @static
         * @param {remote.RemoteMessage.$Properties} message RemoteMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.remoteConfigure != null && $Object.hasOwnProperty.call(message, "remoteConfigure"))
                $root.remote.RemoteConfigure.encode(message.remoteConfigure, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.remoteSetActive != null && $Object.hasOwnProperty.call(message, "remoteSetActive"))
                $root.remote.RemoteSetActive.encode(message.remoteSetActive, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.remoteError != null && $Object.hasOwnProperty.call(message, "remoteError"))
                $root.remote.RemoteError.encode(message.remoteError, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.remotePingRequest != null && $Object.hasOwnProperty.call(message, "remotePingRequest"))
                $root.remote.RemotePingRequest.encode(message.remotePingRequest, writer.uint32(/* id 8, wireType 2 =*/66).fork(), _depth + 1).ldelim();
            if (message.remotePingResponse != null && $Object.hasOwnProperty.call(message, "remotePingResponse"))
                $root.remote.RemotePingResponse.encode(message.remotePingResponse, writer.uint32(/* id 9, wireType 2 =*/74).fork(), _depth + 1).ldelim();
            if (message.remoteKeyInject != null && $Object.hasOwnProperty.call(message, "remoteKeyInject"))
                $root.remote.RemoteKeyInject.encode(message.remoteKeyInject, writer.uint32(/* id 10, wireType 2 =*/82).fork(), _depth + 1).ldelim();
            if (message.remoteImeKeyInject != null && $Object.hasOwnProperty.call(message, "remoteImeKeyInject"))
                $root.remote.RemoteImeKeyInject.encode(message.remoteImeKeyInject, writer.uint32(/* id 20, wireType 2 =*/162).fork(), _depth + 1).ldelim();
            if (message.remoteImeBatchEdit != null && $Object.hasOwnProperty.call(message, "remoteImeBatchEdit"))
                $root.remote.RemoteImeBatchEdit.encode(message.remoteImeBatchEdit, writer.uint32(/* id 21, wireType 2 =*/170).fork(), _depth + 1).ldelim();
            if (message.remoteImeShowRequest != null && $Object.hasOwnProperty.call(message, "remoteImeShowRequest"))
                $root.remote.RemoteImeShowRequest.encode(message.remoteImeShowRequest, writer.uint32(/* id 22, wireType 2 =*/178).fork(), _depth + 1).ldelim();
            if (message.remoteVoiceBegin != null && $Object.hasOwnProperty.call(message, "remoteVoiceBegin"))
                $root.remote.RemoteVoiceBegin.encode(message.remoteVoiceBegin, writer.uint32(/* id 30, wireType 2 =*/242).fork(), _depth + 1).ldelim();
            if (message.remoteVoicePayload != null && $Object.hasOwnProperty.call(message, "remoteVoicePayload"))
                $root.remote.RemoteVoicePayload.encode(message.remoteVoicePayload, writer.uint32(/* id 31, wireType 2 =*/250).fork(), _depth + 1).ldelim();
            if (message.remoteVoiceEnd != null && $Object.hasOwnProperty.call(message, "remoteVoiceEnd"))
                $root.remote.RemoteVoiceEnd.encode(message.remoteVoiceEnd, writer.uint32(/* id 32, wireType 2 =*/258).fork(), _depth + 1).ldelim();
            if (message.remoteStart != null && $Object.hasOwnProperty.call(message, "remoteStart"))
                $root.remote.RemoteStart.encode(message.remoteStart, writer.uint32(/* id 40, wireType 2 =*/322).fork(), _depth + 1).ldelim();
            if (message.remoteSetVolumeLevel != null && $Object.hasOwnProperty.call(message, "remoteSetVolumeLevel"))
                $root.remote.RemoteSetVolumeLevel.encode(message.remoteSetVolumeLevel, writer.uint32(/* id 50, wireType 2 =*/402).fork(), _depth + 1).ldelim();
            if (message.remoteAdjustVolumeLevel != null && $Object.hasOwnProperty.call(message, "remoteAdjustVolumeLevel"))
                $root.remote.RemoteAdjustVolumeLevel.encode(message.remoteAdjustVolumeLevel, writer.uint32(/* id 51, wireType 2 =*/410).fork(), _depth + 1).ldelim();
            if (message.remoteSetPreferredAudioDevice != null && $Object.hasOwnProperty.call(message, "remoteSetPreferredAudioDevice"))
                $root.remote.RemoteSetPreferredAudioDevice.encode(message.remoteSetPreferredAudioDevice, writer.uint32(/* id 60, wireType 2 =*/482).fork(), _depth + 1).ldelim();
            if (message.remoteResetPreferredAudioDevice != null && $Object.hasOwnProperty.call(message, "remoteResetPreferredAudioDevice"))
                $root.remote.RemoteResetPreferredAudioDevice.encode(message.remoteResetPreferredAudioDevice, writer.uint32(/* id 61, wireType 2 =*/490).fork(), _depth + 1).ldelim();
            if (message.remoteAppLinkLaunchRequest != null && $Object.hasOwnProperty.call(message, "remoteAppLinkLaunchRequest"))
                $root.remote.RemoteAppLinkLaunchRequest.encode(message.remoteAppLinkLaunchRequest, writer.uint32(/* id 90, wireType 2 =*/722).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RemoteMessage message, length delimited. Does not implicitly {@link remote.RemoteMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof remote.RemoteMessage
         * @static
         * @param {remote.RemoteMessage.$Properties} message RemoteMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RemoteMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RemoteMessage message from the specified reader or buffer.
         * @function decode
         * @memberof remote.RemoteMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.RemoteMessage & remote.RemoteMessage.$Shape} RemoteMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.remote.RemoteMessage(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.remoteConfigure = $root.remote.RemoteConfigure.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteConfigure);
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.remoteSetActive = $root.remote.RemoteSetActive.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteSetActive);
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.remoteError = $root.remote.RemoteError.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteError);
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.remotePingRequest = $root.remote.RemotePingRequest.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remotePingRequest);
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        message.remotePingResponse = $root.remote.RemotePingResponse.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remotePingResponse);
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        message.remoteKeyInject = $root.remote.RemoteKeyInject.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteKeyInject);
                        continue;
                    }
                case 20: {
                        if (wireType !== 2)
                            break;
                        message.remoteImeKeyInject = $root.remote.RemoteImeKeyInject.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteImeKeyInject);
                        continue;
                    }
                case 21: {
                        if (wireType !== 2)
                            break;
                        message.remoteImeBatchEdit = $root.remote.RemoteImeBatchEdit.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteImeBatchEdit);
                        continue;
                    }
                case 22: {
                        if (wireType !== 2)
                            break;
                        message.remoteImeShowRequest = $root.remote.RemoteImeShowRequest.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteImeShowRequest);
                        continue;
                    }
                case 30: {
                        if (wireType !== 2)
                            break;
                        message.remoteVoiceBegin = $root.remote.RemoteVoiceBegin.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteVoiceBegin);
                        continue;
                    }
                case 31: {
                        if (wireType !== 2)
                            break;
                        message.remoteVoicePayload = $root.remote.RemoteVoicePayload.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteVoicePayload);
                        continue;
                    }
                case 32: {
                        if (wireType !== 2)
                            break;
                        message.remoteVoiceEnd = $root.remote.RemoteVoiceEnd.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteVoiceEnd);
                        continue;
                    }
                case 40: {
                        if (wireType !== 2)
                            break;
                        message.remoteStart = $root.remote.RemoteStart.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteStart);
                        continue;
                    }
                case 50: {
                        if (wireType !== 2)
                            break;
                        message.remoteSetVolumeLevel = $root.remote.RemoteSetVolumeLevel.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteSetVolumeLevel);
                        continue;
                    }
                case 51: {
                        if (wireType !== 2)
                            break;
                        message.remoteAdjustVolumeLevel = $root.remote.RemoteAdjustVolumeLevel.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteAdjustVolumeLevel);
                        continue;
                    }
                case 60: {
                        if (wireType !== 2)
                            break;
                        message.remoteSetPreferredAudioDevice = $root.remote.RemoteSetPreferredAudioDevice.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteSetPreferredAudioDevice);
                        continue;
                    }
                case 61: {
                        if (wireType !== 2)
                            break;
                        message.remoteResetPreferredAudioDevice = $root.remote.RemoteResetPreferredAudioDevice.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteResetPreferredAudioDevice);
                        continue;
                    }
                case 90: {
                        if (wireType !== 2)
                            break;
                        message.remoteAppLinkLaunchRequest = $root.remote.RemoteAppLinkLaunchRequest.decode(reader, reader.uint32(), $undefined, _depth + 1, message.remoteAppLinkLaunchRequest);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RemoteMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof remote.RemoteMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.RemoteMessage & remote.RemoteMessage.$Shape} RemoteMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RemoteMessage.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RemoteMessage message.
         * @function verify
         * @memberof remote.RemoteMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RemoteMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.remoteConfigure != null && $Object.hasOwnProperty.call(message, "remoteConfigure")) {
                var error = $root.remote.RemoteConfigure.verify(message.remoteConfigure, _depth + 1);
                if (error)
                    return "remoteConfigure." + error;
            }
            if (message.remoteSetActive != null && $Object.hasOwnProperty.call(message, "remoteSetActive")) {
                var error = $root.remote.RemoteSetActive.verify(message.remoteSetActive, _depth + 1);
                if (error)
                    return "remoteSetActive." + error;
            }
            if (message.remoteError != null && $Object.hasOwnProperty.call(message, "remoteError")) {
                var error = $root.remote.RemoteError.verify(message.remoteError, _depth + 1);
                if (error)
                    return "remoteError." + error;
            }
            if (message.remotePingRequest != null && $Object.hasOwnProperty.call(message, "remotePingRequest")) {
                var error = $root.remote.RemotePingRequest.verify(message.remotePingRequest, _depth + 1);
                if (error)
                    return "remotePingRequest." + error;
            }
            if (message.remotePingResponse != null && $Object.hasOwnProperty.call(message, "remotePingResponse")) {
                var error = $root.remote.RemotePingResponse.verify(message.remotePingResponse, _depth + 1);
                if (error)
                    return "remotePingResponse." + error;
            }
            if (message.remoteKeyInject != null && $Object.hasOwnProperty.call(message, "remoteKeyInject")) {
                var error = $root.remote.RemoteKeyInject.verify(message.remoteKeyInject, _depth + 1);
                if (error)
                    return "remoteKeyInject." + error;
            }
            if (message.remoteImeKeyInject != null && $Object.hasOwnProperty.call(message, "remoteImeKeyInject")) {
                var error = $root.remote.RemoteImeKeyInject.verify(message.remoteImeKeyInject, _depth + 1);
                if (error)
                    return "remoteImeKeyInject." + error;
            }
            if (message.remoteImeBatchEdit != null && $Object.hasOwnProperty.call(message, "remoteImeBatchEdit")) {
                var error = $root.remote.RemoteImeBatchEdit.verify(message.remoteImeBatchEdit, _depth + 1);
                if (error)
                    return "remoteImeBatchEdit." + error;
            }
            if (message.remoteImeShowRequest != null && $Object.hasOwnProperty.call(message, "remoteImeShowRequest")) {
                var error = $root.remote.RemoteImeShowRequest.verify(message.remoteImeShowRequest, _depth + 1);
                if (error)
                    return "remoteImeShowRequest." + error;
            }
            if (message.remoteVoiceBegin != null && $Object.hasOwnProperty.call(message, "remoteVoiceBegin")) {
                var error = $root.remote.RemoteVoiceBegin.verify(message.remoteVoiceBegin, _depth + 1);
                if (error)
                    return "remoteVoiceBegin." + error;
            }
            if (message.remoteVoicePayload != null && $Object.hasOwnProperty.call(message, "remoteVoicePayload")) {
                var error = $root.remote.RemoteVoicePayload.verify(message.remoteVoicePayload, _depth + 1);
                if (error)
                    return "remoteVoicePayload." + error;
            }
            if (message.remoteVoiceEnd != null && $Object.hasOwnProperty.call(message, "remoteVoiceEnd")) {
                var error = $root.remote.RemoteVoiceEnd.verify(message.remoteVoiceEnd, _depth + 1);
                if (error)
                    return "remoteVoiceEnd." + error;
            }
            if (message.remoteStart != null && $Object.hasOwnProperty.call(message, "remoteStart")) {
                var error = $root.remote.RemoteStart.verify(message.remoteStart, _depth + 1);
                if (error)
                    return "remoteStart." + error;
            }
            if (message.remoteSetVolumeLevel != null && $Object.hasOwnProperty.call(message, "remoteSetVolumeLevel")) {
                var error = $root.remote.RemoteSetVolumeLevel.verify(message.remoteSetVolumeLevel, _depth + 1);
                if (error)
                    return "remoteSetVolumeLevel." + error;
            }
            if (message.remoteAdjustVolumeLevel != null && $Object.hasOwnProperty.call(message, "remoteAdjustVolumeLevel")) {
                var error = $root.remote.RemoteAdjustVolumeLevel.verify(message.remoteAdjustVolumeLevel, _depth + 1);
                if (error)
                    return "remoteAdjustVolumeLevel." + error;
            }
            if (message.remoteSetPreferredAudioDevice != null && $Object.hasOwnProperty.call(message, "remoteSetPreferredAudioDevice")) {
                var error = $root.remote.RemoteSetPreferredAudioDevice.verify(message.remoteSetPreferredAudioDevice, _depth + 1);
                if (error)
                    return "remoteSetPreferredAudioDevice." + error;
            }
            if (message.remoteResetPreferredAudioDevice != null && $Object.hasOwnProperty.call(message, "remoteResetPreferredAudioDevice")) {
                var error = $root.remote.RemoteResetPreferredAudioDevice.verify(message.remoteResetPreferredAudioDevice, _depth + 1);
                if (error)
                    return "remoteResetPreferredAudioDevice." + error;
            }
            if (message.remoteAppLinkLaunchRequest != null && $Object.hasOwnProperty.call(message, "remoteAppLinkLaunchRequest")) {
                var error = $root.remote.RemoteAppLinkLaunchRequest.verify(message.remoteAppLinkLaunchRequest, _depth + 1);
                if (error)
                    return "remoteAppLinkLaunchRequest." + error;
            }
            return null;
        };

        /**
         * Creates a RemoteMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof remote.RemoteMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.RemoteMessage} RemoteMessage
         */
        RemoteMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.remote.RemoteMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".remote.RemoteMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.remote.RemoteMessage();
            if (object.remoteConfigure != null) {
                if (!$util.isObject(object.remoteConfigure))
                    throw $TypeError(".remote.RemoteMessage.remoteConfigure: object expected");
                message.remoteConfigure = $root.remote.RemoteConfigure.fromObject(object.remoteConfigure, _depth + 1);
            }
            if (object.remoteSetActive != null) {
                if (!$util.isObject(object.remoteSetActive))
                    throw $TypeError(".remote.RemoteMessage.remoteSetActive: object expected");
                message.remoteSetActive = $root.remote.RemoteSetActive.fromObject(object.remoteSetActive, _depth + 1);
            }
            if (object.remoteError != null) {
                if (!$util.isObject(object.remoteError))
                    throw $TypeError(".remote.RemoteMessage.remoteError: object expected");
                message.remoteError = $root.remote.RemoteError.fromObject(object.remoteError, _depth + 1);
            }
            if (object.remotePingRequest != null) {
                if (!$util.isObject(object.remotePingRequest))
                    throw $TypeError(".remote.RemoteMessage.remotePingRequest: object expected");
                message.remotePingRequest = $root.remote.RemotePingRequest.fromObject(object.remotePingRequest, _depth + 1);
            }
            if (object.remotePingResponse != null) {
                if (!$util.isObject(object.remotePingResponse))
                    throw $TypeError(".remote.RemoteMessage.remotePingResponse: object expected");
                message.remotePingResponse = $root.remote.RemotePingResponse.fromObject(object.remotePingResponse, _depth + 1);
            }
            if (object.remoteKeyInject != null) {
                if (!$util.isObject(object.remoteKeyInject))
                    throw $TypeError(".remote.RemoteMessage.remoteKeyInject: object expected");
                message.remoteKeyInject = $root.remote.RemoteKeyInject.fromObject(object.remoteKeyInject, _depth + 1);
            }
            if (object.remoteImeKeyInject != null) {
                if (!$util.isObject(object.remoteImeKeyInject))
                    throw $TypeError(".remote.RemoteMessage.remoteImeKeyInject: object expected");
                message.remoteImeKeyInject = $root.remote.RemoteImeKeyInject.fromObject(object.remoteImeKeyInject, _depth + 1);
            }
            if (object.remoteImeBatchEdit != null) {
                if (!$util.isObject(object.remoteImeBatchEdit))
                    throw $TypeError(".remote.RemoteMessage.remoteImeBatchEdit: object expected");
                message.remoteImeBatchEdit = $root.remote.RemoteImeBatchEdit.fromObject(object.remoteImeBatchEdit, _depth + 1);
            }
            if (object.remoteImeShowRequest != null) {
                if (!$util.isObject(object.remoteImeShowRequest))
                    throw $TypeError(".remote.RemoteMessage.remoteImeShowRequest: object expected");
                message.remoteImeShowRequest = $root.remote.RemoteImeShowRequest.fromObject(object.remoteImeShowRequest, _depth + 1);
            }
            if (object.remoteVoiceBegin != null) {
                if (!$util.isObject(object.remoteVoiceBegin))
                    throw $TypeError(".remote.RemoteMessage.remoteVoiceBegin: object expected");
                message.remoteVoiceBegin = $root.remote.RemoteVoiceBegin.fromObject(object.remoteVoiceBegin, _depth + 1);
            }
            if (object.remoteVoicePayload != null) {
                if (!$util.isObject(object.remoteVoicePayload))
                    throw $TypeError(".remote.RemoteMessage.remoteVoicePayload: object expected");
                message.remoteVoicePayload = $root.remote.RemoteVoicePayload.fromObject(object.remoteVoicePayload, _depth + 1);
            }
            if (object.remoteVoiceEnd != null) {
                if (!$util.isObject(object.remoteVoiceEnd))
                    throw $TypeError(".remote.RemoteMessage.remoteVoiceEnd: object expected");
                message.remoteVoiceEnd = $root.remote.RemoteVoiceEnd.fromObject(object.remoteVoiceEnd, _depth + 1);
            }
            if (object.remoteStart != null) {
                if (!$util.isObject(object.remoteStart))
                    throw $TypeError(".remote.RemoteMessage.remoteStart: object expected");
                message.remoteStart = $root.remote.RemoteStart.fromObject(object.remoteStart, _depth + 1);
            }
            if (object.remoteSetVolumeLevel != null) {
                if (!$util.isObject(object.remoteSetVolumeLevel))
                    throw $TypeError(".remote.RemoteMessage.remoteSetVolumeLevel: object expected");
                message.remoteSetVolumeLevel = $root.remote.RemoteSetVolumeLevel.fromObject(object.remoteSetVolumeLevel, _depth + 1);
            }
            if (object.remoteAdjustVolumeLevel != null) {
                if (!$util.isObject(object.remoteAdjustVolumeLevel))
                    throw $TypeError(".remote.RemoteMessage.remoteAdjustVolumeLevel: object expected");
                message.remoteAdjustVolumeLevel = $root.remote.RemoteAdjustVolumeLevel.fromObject(object.remoteAdjustVolumeLevel, _depth + 1);
            }
            if (object.remoteSetPreferredAudioDevice != null) {
                if (!$util.isObject(object.remoteSetPreferredAudioDevice))
                    throw $TypeError(".remote.RemoteMessage.remoteSetPreferredAudioDevice: object expected");
                message.remoteSetPreferredAudioDevice = $root.remote.RemoteSetPreferredAudioDevice.fromObject(object.remoteSetPreferredAudioDevice, _depth + 1);
            }
            if (object.remoteResetPreferredAudioDevice != null) {
                if (!$util.isObject(object.remoteResetPreferredAudioDevice))
                    throw $TypeError(".remote.RemoteMessage.remoteResetPreferredAudioDevice: object expected");
                message.remoteResetPreferredAudioDevice = $root.remote.RemoteResetPreferredAudioDevice.fromObject(object.remoteResetPreferredAudioDevice, _depth + 1);
            }
            if (object.remoteAppLinkLaunchRequest != null) {
                if (!$util.isObject(object.remoteAppLinkLaunchRequest))
                    throw $TypeError(".remote.RemoteMessage.remoteAppLinkLaunchRequest: object expected");
                message.remoteAppLinkLaunchRequest = $root.remote.RemoteAppLinkLaunchRequest.fromObject(object.remoteAppLinkLaunchRequest, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a RemoteMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof remote.RemoteMessage
         * @static
         * @param {remote.RemoteMessage} message RemoteMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RemoteMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.remoteConfigure = null;
                object.remoteSetActive = null;
                object.remoteError = null;
                object.remotePingRequest = null;
                object.remotePingResponse = null;
                object.remoteKeyInject = null;
                object.remoteImeKeyInject = null;
                object.remoteImeBatchEdit = null;
                object.remoteImeShowRequest = null;
                object.remoteVoiceBegin = null;
                object.remoteVoicePayload = null;
                object.remoteVoiceEnd = null;
                object.remoteStart = null;
                object.remoteSetVolumeLevel = null;
                object.remoteAdjustVolumeLevel = null;
                object.remoteSetPreferredAudioDevice = null;
                object.remoteResetPreferredAudioDevice = null;
                object.remoteAppLinkLaunchRequest = null;
            }
            if (message.remoteConfigure != null && $Object.hasOwnProperty.call(message, "remoteConfigure"))
                object.remoteConfigure = $root.remote.RemoteConfigure.toObject(message.remoteConfigure, options, _depth + 1);
            if (message.remoteSetActive != null && $Object.hasOwnProperty.call(message, "remoteSetActive"))
                object.remoteSetActive = $root.remote.RemoteSetActive.toObject(message.remoteSetActive, options, _depth + 1);
            if (message.remoteError != null && $Object.hasOwnProperty.call(message, "remoteError"))
                object.remoteError = $root.remote.RemoteError.toObject(message.remoteError, options, _depth + 1);
            if (message.remotePingRequest != null && $Object.hasOwnProperty.call(message, "remotePingRequest"))
                object.remotePingRequest = $root.remote.RemotePingRequest.toObject(message.remotePingRequest, options, _depth + 1);
            if (message.remotePingResponse != null && $Object.hasOwnProperty.call(message, "remotePingResponse"))
                object.remotePingResponse = $root.remote.RemotePingResponse.toObject(message.remotePingResponse, options, _depth + 1);
            if (message.remoteKeyInject != null && $Object.hasOwnProperty.call(message, "remoteKeyInject"))
                object.remoteKeyInject = $root.remote.RemoteKeyInject.toObject(message.remoteKeyInject, options, _depth + 1);
            if (message.remoteImeKeyInject != null && $Object.hasOwnProperty.call(message, "remoteImeKeyInject"))
                object.remoteImeKeyInject = $root.remote.RemoteImeKeyInject.toObject(message.remoteImeKeyInject, options, _depth + 1);
            if (message.remoteImeBatchEdit != null && $Object.hasOwnProperty.call(message, "remoteImeBatchEdit"))
                object.remoteImeBatchEdit = $root.remote.RemoteImeBatchEdit.toObject(message.remoteImeBatchEdit, options, _depth + 1);
            if (message.remoteImeShowRequest != null && $Object.hasOwnProperty.call(message, "remoteImeShowRequest"))
                object.remoteImeShowRequest = $root.remote.RemoteImeShowRequest.toObject(message.remoteImeShowRequest, options, _depth + 1);
            if (message.remoteVoiceBegin != null && $Object.hasOwnProperty.call(message, "remoteVoiceBegin"))
                object.remoteVoiceBegin = $root.remote.RemoteVoiceBegin.toObject(message.remoteVoiceBegin, options, _depth + 1);
            if (message.remoteVoicePayload != null && $Object.hasOwnProperty.call(message, "remoteVoicePayload"))
                object.remoteVoicePayload = $root.remote.RemoteVoicePayload.toObject(message.remoteVoicePayload, options, _depth + 1);
            if (message.remoteVoiceEnd != null && $Object.hasOwnProperty.call(message, "remoteVoiceEnd"))
                object.remoteVoiceEnd = $root.remote.RemoteVoiceEnd.toObject(message.remoteVoiceEnd, options, _depth + 1);
            if (message.remoteStart != null && $Object.hasOwnProperty.call(message, "remoteStart"))
                object.remoteStart = $root.remote.RemoteStart.toObject(message.remoteStart, options, _depth + 1);
            if (message.remoteSetVolumeLevel != null && $Object.hasOwnProperty.call(message, "remoteSetVolumeLevel"))
                object.remoteSetVolumeLevel = $root.remote.RemoteSetVolumeLevel.toObject(message.remoteSetVolumeLevel, options, _depth + 1);
            if (message.remoteAdjustVolumeLevel != null && $Object.hasOwnProperty.call(message, "remoteAdjustVolumeLevel"))
                object.remoteAdjustVolumeLevel = $root.remote.RemoteAdjustVolumeLevel.toObject(message.remoteAdjustVolumeLevel, options, _depth + 1);
            if (message.remoteSetPreferredAudioDevice != null && $Object.hasOwnProperty.call(message, "remoteSetPreferredAudioDevice"))
                object.remoteSetPreferredAudioDevice = $root.remote.RemoteSetPreferredAudioDevice.toObject(message.remoteSetPreferredAudioDevice, options, _depth + 1);
            if (message.remoteResetPreferredAudioDevice != null && $Object.hasOwnProperty.call(message, "remoteResetPreferredAudioDevice"))
                object.remoteResetPreferredAudioDevice = $root.remote.RemoteResetPreferredAudioDevice.toObject(message.remoteResetPreferredAudioDevice, options, _depth + 1);
            if (message.remoteAppLinkLaunchRequest != null && $Object.hasOwnProperty.call(message, "remoteAppLinkLaunchRequest"))
                object.remoteAppLinkLaunchRequest = $root.remote.RemoteAppLinkLaunchRequest.toObject(message.remoteAppLinkLaunchRequest, options, _depth + 1);
            return object;
        };

        /**
         * Converts this RemoteMessage to JSON.
         * @function toJSON
         * @memberof remote.RemoteMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RemoteMessage.prototype.toJSON = function() {
            return RemoteMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RemoteMessage
         * @function getTypeUrl
         * @memberof remote.RemoteMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RemoteMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/remote.RemoteMessage";
        };

        return RemoteMessage;
    })();

    /**
     * RemoteKeyCode enum.
     * @name remote.RemoteKeyCode
     * @enum {number}
     * @property {number} KEYCODE_UNKNOWN=0 KEYCODE_UNKNOWN value
     * @property {number} KEYCODE_SOFT_LEFT=1 KEYCODE_SOFT_LEFT value
     * @property {number} KEYCODE_SOFT_RIGHT=2 KEYCODE_SOFT_RIGHT value
     * @property {number} KEYCODE_HOME=3 KEYCODE_HOME value
     * @property {number} KEYCODE_BACK=4 KEYCODE_BACK value
     * @property {number} KEYCODE_CALL=5 KEYCODE_CALL value
     * @property {number} KEYCODE_ENDCALL=6 KEYCODE_ENDCALL value
     * @property {number} KEYCODE_0=7 KEYCODE_0 value
     * @property {number} KEYCODE_1=8 KEYCODE_1 value
     * @property {number} KEYCODE_2=9 KEYCODE_2 value
     * @property {number} KEYCODE_3=10 KEYCODE_3 value
     * @property {number} KEYCODE_4=11 KEYCODE_4 value
     * @property {number} KEYCODE_5=12 KEYCODE_5 value
     * @property {number} KEYCODE_6=13 KEYCODE_6 value
     * @property {number} KEYCODE_7=14 KEYCODE_7 value
     * @property {number} KEYCODE_8=15 KEYCODE_8 value
     * @property {number} KEYCODE_9=16 KEYCODE_9 value
     * @property {number} KEYCODE_STAR=17 KEYCODE_STAR value
     * @property {number} KEYCODE_POUND=18 KEYCODE_POUND value
     * @property {number} KEYCODE_DPAD_UP=19 KEYCODE_DPAD_UP value
     * @property {number} KEYCODE_DPAD_DOWN=20 KEYCODE_DPAD_DOWN value
     * @property {number} KEYCODE_DPAD_LEFT=21 KEYCODE_DPAD_LEFT value
     * @property {number} KEYCODE_DPAD_RIGHT=22 KEYCODE_DPAD_RIGHT value
     * @property {number} KEYCODE_DPAD_CENTER=23 KEYCODE_DPAD_CENTER value
     * @property {number} KEYCODE_VOLUME_UP=24 KEYCODE_VOLUME_UP value
     * @property {number} KEYCODE_VOLUME_DOWN=25 KEYCODE_VOLUME_DOWN value
     * @property {number} KEYCODE_POWER=26 KEYCODE_POWER value
     * @property {number} KEYCODE_CAMERA=27 KEYCODE_CAMERA value
     * @property {number} KEYCODE_CLEAR=28 KEYCODE_CLEAR value
     * @property {number} KEYCODE_A=29 KEYCODE_A value
     * @property {number} KEYCODE_B=30 KEYCODE_B value
     * @property {number} KEYCODE_C=31 KEYCODE_C value
     * @property {number} KEYCODE_D=32 KEYCODE_D value
     * @property {number} KEYCODE_E=33 KEYCODE_E value
     * @property {number} KEYCODE_F=34 KEYCODE_F value
     * @property {number} KEYCODE_G=35 KEYCODE_G value
     * @property {number} KEYCODE_H=36 KEYCODE_H value
     * @property {number} KEYCODE_I=37 KEYCODE_I value
     * @property {number} KEYCODE_J=38 KEYCODE_J value
     * @property {number} KEYCODE_K=39 KEYCODE_K value
     * @property {number} KEYCODE_L=40 KEYCODE_L value
     * @property {number} KEYCODE_M=41 KEYCODE_M value
     * @property {number} KEYCODE_N=42 KEYCODE_N value
     * @property {number} KEYCODE_O=43 KEYCODE_O value
     * @property {number} KEYCODE_P=44 KEYCODE_P value
     * @property {number} KEYCODE_Q=45 KEYCODE_Q value
     * @property {number} KEYCODE_R=46 KEYCODE_R value
     * @property {number} KEYCODE_S=47 KEYCODE_S value
     * @property {number} KEYCODE_T=48 KEYCODE_T value
     * @property {number} KEYCODE_U=49 KEYCODE_U value
     * @property {number} KEYCODE_V=50 KEYCODE_V value
     * @property {number} KEYCODE_W=51 KEYCODE_W value
     * @property {number} KEYCODE_X=52 KEYCODE_X value
     * @property {number} KEYCODE_Y=53 KEYCODE_Y value
     * @property {number} KEYCODE_Z=54 KEYCODE_Z value
     * @property {number} KEYCODE_COMMA=55 KEYCODE_COMMA value
     * @property {number} KEYCODE_PERIOD=56 KEYCODE_PERIOD value
     * @property {number} KEYCODE_ALT_LEFT=57 KEYCODE_ALT_LEFT value
     * @property {number} KEYCODE_ALT_RIGHT=58 KEYCODE_ALT_RIGHT value
     * @property {number} KEYCODE_SHIFT_LEFT=59 KEYCODE_SHIFT_LEFT value
     * @property {number} KEYCODE_SHIFT_RIGHT=60 KEYCODE_SHIFT_RIGHT value
     * @property {number} KEYCODE_TAB=61 KEYCODE_TAB value
     * @property {number} KEYCODE_SPACE=62 KEYCODE_SPACE value
     * @property {number} KEYCODE_SYM=63 KEYCODE_SYM value
     * @property {number} KEYCODE_EXPLORER=64 KEYCODE_EXPLORER value
     * @property {number} KEYCODE_ENVELOPE=65 KEYCODE_ENVELOPE value
     * @property {number} KEYCODE_ENTER=66 KEYCODE_ENTER value
     * @property {number} KEYCODE_DEL=67 KEYCODE_DEL value
     * @property {number} KEYCODE_GRAVE=68 KEYCODE_GRAVE value
     * @property {number} KEYCODE_MINUS=69 KEYCODE_MINUS value
     * @property {number} KEYCODE_EQUALS=70 KEYCODE_EQUALS value
     * @property {number} KEYCODE_LEFT_BRACKET=71 KEYCODE_LEFT_BRACKET value
     * @property {number} KEYCODE_RIGHT_BRACKET=72 KEYCODE_RIGHT_BRACKET value
     * @property {number} KEYCODE_BACKSLASH=73 KEYCODE_BACKSLASH value
     * @property {number} KEYCODE_SEMICOLON=74 KEYCODE_SEMICOLON value
     * @property {number} KEYCODE_APOSTROPHE=75 KEYCODE_APOSTROPHE value
     * @property {number} KEYCODE_SLASH=76 KEYCODE_SLASH value
     * @property {number} KEYCODE_AT=77 KEYCODE_AT value
     * @property {number} KEYCODE_NUM=78 KEYCODE_NUM value
     * @property {number} KEYCODE_HEADSETHOOK=79 KEYCODE_HEADSETHOOK value
     * @property {number} KEYCODE_FOCUS=80 KEYCODE_FOCUS value
     * @property {number} KEYCODE_PLUS=81 KEYCODE_PLUS value
     * @property {number} KEYCODE_MENU=82 KEYCODE_MENU value
     * @property {number} KEYCODE_NOTIFICATION=83 KEYCODE_NOTIFICATION value
     * @property {number} KEYCODE_SEARCH=84 KEYCODE_SEARCH value
     * @property {number} KEYCODE_MEDIA_PLAY_PAUSE=85 KEYCODE_MEDIA_PLAY_PAUSE value
     * @property {number} KEYCODE_MEDIA_STOP=86 KEYCODE_MEDIA_STOP value
     * @property {number} KEYCODE_MEDIA_NEXT=87 KEYCODE_MEDIA_NEXT value
     * @property {number} KEYCODE_MEDIA_PREVIOUS=88 KEYCODE_MEDIA_PREVIOUS value
     * @property {number} KEYCODE_MEDIA_REWIND=89 KEYCODE_MEDIA_REWIND value
     * @property {number} KEYCODE_MEDIA_FAST_FORWARD=90 KEYCODE_MEDIA_FAST_FORWARD value
     * @property {number} KEYCODE_MUTE=91 KEYCODE_MUTE value
     * @property {number} KEYCODE_PAGE_UP=92 KEYCODE_PAGE_UP value
     * @property {number} KEYCODE_PAGE_DOWN=93 KEYCODE_PAGE_DOWN value
     * @property {number} KEYCODE_PICTSYMBOLS=94 KEYCODE_PICTSYMBOLS value
     * @property {number} KEYCODE_SWITCH_CHARSET=95 KEYCODE_SWITCH_CHARSET value
     * @property {number} KEYCODE_BUTTON_A=96 KEYCODE_BUTTON_A value
     * @property {number} KEYCODE_BUTTON_B=97 KEYCODE_BUTTON_B value
     * @property {number} KEYCODE_BUTTON_C=98 KEYCODE_BUTTON_C value
     * @property {number} KEYCODE_BUTTON_X=99 KEYCODE_BUTTON_X value
     * @property {number} KEYCODE_BUTTON_Y=100 KEYCODE_BUTTON_Y value
     * @property {number} KEYCODE_BUTTON_Z=101 KEYCODE_BUTTON_Z value
     * @property {number} KEYCODE_BUTTON_L1=102 KEYCODE_BUTTON_L1 value
     * @property {number} KEYCODE_BUTTON_R1=103 KEYCODE_BUTTON_R1 value
     * @property {number} KEYCODE_BUTTON_L2=104 KEYCODE_BUTTON_L2 value
     * @property {number} KEYCODE_BUTTON_R2=105 KEYCODE_BUTTON_R2 value
     * @property {number} KEYCODE_BUTTON_THUMBL=106 KEYCODE_BUTTON_THUMBL value
     * @property {number} KEYCODE_BUTTON_THUMBR=107 KEYCODE_BUTTON_THUMBR value
     * @property {number} KEYCODE_BUTTON_START=108 KEYCODE_BUTTON_START value
     * @property {number} KEYCODE_BUTTON_SELECT=109 KEYCODE_BUTTON_SELECT value
     * @property {number} KEYCODE_BUTTON_MODE=110 KEYCODE_BUTTON_MODE value
     * @property {number} KEYCODE_ESCAPE=111 KEYCODE_ESCAPE value
     * @property {number} KEYCODE_FORWARD_DEL=112 KEYCODE_FORWARD_DEL value
     * @property {number} KEYCODE_CTRL_LEFT=113 KEYCODE_CTRL_LEFT value
     * @property {number} KEYCODE_CTRL_RIGHT=114 KEYCODE_CTRL_RIGHT value
     * @property {number} KEYCODE_CAPS_LOCK=115 KEYCODE_CAPS_LOCK value
     * @property {number} KEYCODE_SCROLL_LOCK=116 KEYCODE_SCROLL_LOCK value
     * @property {number} KEYCODE_META_LEFT=117 KEYCODE_META_LEFT value
     * @property {number} KEYCODE_META_RIGHT=118 KEYCODE_META_RIGHT value
     * @property {number} KEYCODE_FUNCTION=119 KEYCODE_FUNCTION value
     * @property {number} KEYCODE_SYSRQ=120 KEYCODE_SYSRQ value
     * @property {number} KEYCODE_BREAK=121 KEYCODE_BREAK value
     * @property {number} KEYCODE_MOVE_HOME=122 KEYCODE_MOVE_HOME value
     * @property {number} KEYCODE_MOVE_END=123 KEYCODE_MOVE_END value
     * @property {number} KEYCODE_INSERT=124 KEYCODE_INSERT value
     * @property {number} KEYCODE_FORWARD=125 KEYCODE_FORWARD value
     * @property {number} KEYCODE_MEDIA_PLAY=126 KEYCODE_MEDIA_PLAY value
     * @property {number} KEYCODE_MEDIA_PAUSE=127 KEYCODE_MEDIA_PAUSE value
     * @property {number} KEYCODE_MEDIA_CLOSE=128 KEYCODE_MEDIA_CLOSE value
     * @property {number} KEYCODE_MEDIA_EJECT=129 KEYCODE_MEDIA_EJECT value
     * @property {number} KEYCODE_MEDIA_RECORD=130 KEYCODE_MEDIA_RECORD value
     * @property {number} KEYCODE_F1=131 KEYCODE_F1 value
     * @property {number} KEYCODE_F2=132 KEYCODE_F2 value
     * @property {number} KEYCODE_F3=133 KEYCODE_F3 value
     * @property {number} KEYCODE_F4=134 KEYCODE_F4 value
     * @property {number} KEYCODE_F5=135 KEYCODE_F5 value
     * @property {number} KEYCODE_F6=136 KEYCODE_F6 value
     * @property {number} KEYCODE_F7=137 KEYCODE_F7 value
     * @property {number} KEYCODE_F8=138 KEYCODE_F8 value
     * @property {number} KEYCODE_F9=139 KEYCODE_F9 value
     * @property {number} KEYCODE_F10=140 KEYCODE_F10 value
     * @property {number} KEYCODE_F11=141 KEYCODE_F11 value
     * @property {number} KEYCODE_F12=142 KEYCODE_F12 value
     * @property {number} KEYCODE_NUM_LOCK=143 KEYCODE_NUM_LOCK value
     * @property {number} KEYCODE_NUMPAD_0=144 KEYCODE_NUMPAD_0 value
     * @property {number} KEYCODE_NUMPAD_1=145 KEYCODE_NUMPAD_1 value
     * @property {number} KEYCODE_NUMPAD_2=146 KEYCODE_NUMPAD_2 value
     * @property {number} KEYCODE_NUMPAD_3=147 KEYCODE_NUMPAD_3 value
     * @property {number} KEYCODE_NUMPAD_4=148 KEYCODE_NUMPAD_4 value
     * @property {number} KEYCODE_NUMPAD_5=149 KEYCODE_NUMPAD_5 value
     * @property {number} KEYCODE_NUMPAD_6=150 KEYCODE_NUMPAD_6 value
     * @property {number} KEYCODE_NUMPAD_7=151 KEYCODE_NUMPAD_7 value
     * @property {number} KEYCODE_NUMPAD_8=152 KEYCODE_NUMPAD_8 value
     * @property {number} KEYCODE_NUMPAD_9=153 KEYCODE_NUMPAD_9 value
     * @property {number} KEYCODE_NUMPAD_DIVIDE=154 KEYCODE_NUMPAD_DIVIDE value
     * @property {number} KEYCODE_NUMPAD_MULTIPLY=155 KEYCODE_NUMPAD_MULTIPLY value
     * @property {number} KEYCODE_NUMPAD_SUBTRACT=156 KEYCODE_NUMPAD_SUBTRACT value
     * @property {number} KEYCODE_NUMPAD_ADD=157 KEYCODE_NUMPAD_ADD value
     * @property {number} KEYCODE_NUMPAD_DOT=158 KEYCODE_NUMPAD_DOT value
     * @property {number} KEYCODE_NUMPAD_COMMA=159 KEYCODE_NUMPAD_COMMA value
     * @property {number} KEYCODE_NUMPAD_ENTER=160 KEYCODE_NUMPAD_ENTER value
     * @property {number} KEYCODE_NUMPAD_EQUALS=161 KEYCODE_NUMPAD_EQUALS value
     * @property {number} KEYCODE_NUMPAD_LEFT_PAREN=162 KEYCODE_NUMPAD_LEFT_PAREN value
     * @property {number} KEYCODE_NUMPAD_RIGHT_PAREN=163 KEYCODE_NUMPAD_RIGHT_PAREN value
     * @property {number} KEYCODE_VOLUME_MUTE=164 KEYCODE_VOLUME_MUTE value
     * @property {number} KEYCODE_INFO=165 KEYCODE_INFO value
     * @property {number} KEYCODE_CHANNEL_UP=166 KEYCODE_CHANNEL_UP value
     * @property {number} KEYCODE_CHANNEL_DOWN=167 KEYCODE_CHANNEL_DOWN value
     * @property {number} KEYCODE_ZOOM_IN=168 KEYCODE_ZOOM_IN value
     * @property {number} KEYCODE_ZOOM_OUT=169 KEYCODE_ZOOM_OUT value
     * @property {number} KEYCODE_TV=170 KEYCODE_TV value
     * @property {number} KEYCODE_WINDOW=171 KEYCODE_WINDOW value
     * @property {number} KEYCODE_GUIDE=172 KEYCODE_GUIDE value
     * @property {number} KEYCODE_DVR=173 KEYCODE_DVR value
     * @property {number} KEYCODE_BOOKMARK=174 KEYCODE_BOOKMARK value
     * @property {number} KEYCODE_CAPTIONS=175 KEYCODE_CAPTIONS value
     * @property {number} KEYCODE_SETTINGS=176 KEYCODE_SETTINGS value
     * @property {number} KEYCODE_TV_POWER=177 KEYCODE_TV_POWER value
     * @property {number} KEYCODE_TV_INPUT=178 KEYCODE_TV_INPUT value
     * @property {number} KEYCODE_STB_POWER=179 KEYCODE_STB_POWER value
     * @property {number} KEYCODE_STB_INPUT=180 KEYCODE_STB_INPUT value
     * @property {number} KEYCODE_AVR_POWER=181 KEYCODE_AVR_POWER value
     * @property {number} KEYCODE_AVR_INPUT=182 KEYCODE_AVR_INPUT value
     * @property {number} KEYCODE_PROG_RED=183 KEYCODE_PROG_RED value
     * @property {number} KEYCODE_PROG_GREEN=184 KEYCODE_PROG_GREEN value
     * @property {number} KEYCODE_PROG_YELLOW=185 KEYCODE_PROG_YELLOW value
     * @property {number} KEYCODE_PROG_BLUE=186 KEYCODE_PROG_BLUE value
     * @property {number} KEYCODE_APP_SWITCH=187 KEYCODE_APP_SWITCH value
     * @property {number} KEYCODE_BUTTON_1=188 KEYCODE_BUTTON_1 value
     * @property {number} KEYCODE_BUTTON_2=189 KEYCODE_BUTTON_2 value
     * @property {number} KEYCODE_BUTTON_3=190 KEYCODE_BUTTON_3 value
     * @property {number} KEYCODE_BUTTON_4=191 KEYCODE_BUTTON_4 value
     * @property {number} KEYCODE_BUTTON_5=192 KEYCODE_BUTTON_5 value
     * @property {number} KEYCODE_BUTTON_6=193 KEYCODE_BUTTON_6 value
     * @property {number} KEYCODE_BUTTON_7=194 KEYCODE_BUTTON_7 value
     * @property {number} KEYCODE_BUTTON_8=195 KEYCODE_BUTTON_8 value
     * @property {number} KEYCODE_BUTTON_9=196 KEYCODE_BUTTON_9 value
     * @property {number} KEYCODE_BUTTON_10=197 KEYCODE_BUTTON_10 value
     * @property {number} KEYCODE_BUTTON_11=198 KEYCODE_BUTTON_11 value
     * @property {number} KEYCODE_BUTTON_12=199 KEYCODE_BUTTON_12 value
     * @property {number} KEYCODE_BUTTON_13=200 KEYCODE_BUTTON_13 value
     * @property {number} KEYCODE_BUTTON_14=201 KEYCODE_BUTTON_14 value
     * @property {number} KEYCODE_BUTTON_15=202 KEYCODE_BUTTON_15 value
     * @property {number} KEYCODE_BUTTON_16=203 KEYCODE_BUTTON_16 value
     * @property {number} KEYCODE_LANGUAGE_SWITCH=204 KEYCODE_LANGUAGE_SWITCH value
     * @property {number} KEYCODE_MANNER_MODE=205 KEYCODE_MANNER_MODE value
     * @property {number} KEYCODE_3D_MODE=206 KEYCODE_3D_MODE value
     * @property {number} KEYCODE_CONTACTS=207 KEYCODE_CONTACTS value
     * @property {number} KEYCODE_CALENDAR=208 KEYCODE_CALENDAR value
     * @property {number} KEYCODE_MUSIC=209 KEYCODE_MUSIC value
     * @property {number} KEYCODE_CALCULATOR=210 KEYCODE_CALCULATOR value
     * @property {number} KEYCODE_ZENKAKU_HANKAKU=211 KEYCODE_ZENKAKU_HANKAKU value
     * @property {number} KEYCODE_EISU=212 KEYCODE_EISU value
     * @property {number} KEYCODE_MUHENKAN=213 KEYCODE_MUHENKAN value
     * @property {number} KEYCODE_HENKAN=214 KEYCODE_HENKAN value
     * @property {number} KEYCODE_KATAKANA_HIRAGANA=215 KEYCODE_KATAKANA_HIRAGANA value
     * @property {number} KEYCODE_YEN=216 KEYCODE_YEN value
     * @property {number} KEYCODE_RO=217 KEYCODE_RO value
     * @property {number} KEYCODE_KANA=218 KEYCODE_KANA value
     * @property {number} KEYCODE_ASSIST=219 KEYCODE_ASSIST value
     * @property {number} KEYCODE_BRIGHTNESS_DOWN=220 KEYCODE_BRIGHTNESS_DOWN value
     * @property {number} KEYCODE_BRIGHTNESS_UP=221 KEYCODE_BRIGHTNESS_UP value
     * @property {number} KEYCODE_MEDIA_AUDIO_TRACK=222 KEYCODE_MEDIA_AUDIO_TRACK value
     * @property {number} KEYCODE_SLEEP=223 KEYCODE_SLEEP value
     * @property {number} KEYCODE_WAKEUP=224 KEYCODE_WAKEUP value
     * @property {number} KEYCODE_PAIRING=225 KEYCODE_PAIRING value
     * @property {number} KEYCODE_MEDIA_TOP_MENU=226 KEYCODE_MEDIA_TOP_MENU value
     * @property {number} KEYCODE_11=227 KEYCODE_11 value
     * @property {number} KEYCODE_12=228 KEYCODE_12 value
     * @property {number} KEYCODE_LAST_CHANNEL=229 KEYCODE_LAST_CHANNEL value
     * @property {number} KEYCODE_TV_DATA_SERVICE=230 KEYCODE_TV_DATA_SERVICE value
     * @property {number} KEYCODE_VOICE_ASSIST=231 KEYCODE_VOICE_ASSIST value
     * @property {number} KEYCODE_TV_RADIO=232 KEYCODE_TV_RADIO value
     * @property {number} KEYCODE_TV_TELETEXT=233 KEYCODE_TV_TELETEXT value
     * @property {number} KEYCODE_TV_NUMBER_ENTRY=234 KEYCODE_TV_NUMBER_ENTRY value
     * @property {number} KEYCODE_TV_TERRESTRIAL_ANALOG=235 KEYCODE_TV_TERRESTRIAL_ANALOG value
     * @property {number} KEYCODE_TV_TERRESTRIAL_DIGITAL=236 KEYCODE_TV_TERRESTRIAL_DIGITAL value
     * @property {number} KEYCODE_TV_SATELLITE=237 KEYCODE_TV_SATELLITE value
     * @property {number} KEYCODE_TV_SATELLITE_BS=238 KEYCODE_TV_SATELLITE_BS value
     * @property {number} KEYCODE_TV_SATELLITE_CS=239 KEYCODE_TV_SATELLITE_CS value
     * @property {number} KEYCODE_TV_SATELLITE_SERVICE=240 KEYCODE_TV_SATELLITE_SERVICE value
     * @property {number} KEYCODE_TV_NETWORK=241 KEYCODE_TV_NETWORK value
     * @property {number} KEYCODE_TV_ANTENNA_CABLE=242 KEYCODE_TV_ANTENNA_CABLE value
     * @property {number} KEYCODE_TV_INPUT_HDMI_1=243 KEYCODE_TV_INPUT_HDMI_1 value
     * @property {number} KEYCODE_TV_INPUT_HDMI_2=244 KEYCODE_TV_INPUT_HDMI_2 value
     * @property {number} KEYCODE_TV_INPUT_HDMI_3=245 KEYCODE_TV_INPUT_HDMI_3 value
     * @property {number} KEYCODE_TV_INPUT_HDMI_4=246 KEYCODE_TV_INPUT_HDMI_4 value
     * @property {number} KEYCODE_TV_INPUT_COMPOSITE_1=247 KEYCODE_TV_INPUT_COMPOSITE_1 value
     * @property {number} KEYCODE_TV_INPUT_COMPOSITE_2=248 KEYCODE_TV_INPUT_COMPOSITE_2 value
     * @property {number} KEYCODE_TV_INPUT_COMPONENT_1=249 KEYCODE_TV_INPUT_COMPONENT_1 value
     * @property {number} KEYCODE_TV_INPUT_COMPONENT_2=250 KEYCODE_TV_INPUT_COMPONENT_2 value
     * @property {number} KEYCODE_TV_INPUT_VGA_1=251 KEYCODE_TV_INPUT_VGA_1 value
     * @property {number} KEYCODE_TV_AUDIO_DESCRIPTION=252 KEYCODE_TV_AUDIO_DESCRIPTION value
     * @property {number} KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP=253 KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP value
     * @property {number} KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN=254 KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN value
     * @property {number} KEYCODE_TV_ZOOM_MODE=255 KEYCODE_TV_ZOOM_MODE value
     * @property {number} KEYCODE_TV_CONTENTS_MENU=256 KEYCODE_TV_CONTENTS_MENU value
     * @property {number} KEYCODE_TV_MEDIA_CONTEXT_MENU=257 KEYCODE_TV_MEDIA_CONTEXT_MENU value
     * @property {number} KEYCODE_TV_TIMER_PROGRAMMING=258 KEYCODE_TV_TIMER_PROGRAMMING value
     * @property {number} KEYCODE_HELP=259 KEYCODE_HELP value
     * @property {number} KEYCODE_NAVIGATE_PREVIOUS=260 KEYCODE_NAVIGATE_PREVIOUS value
     * @property {number} KEYCODE_NAVIGATE_NEXT=261 KEYCODE_NAVIGATE_NEXT value
     * @property {number} KEYCODE_NAVIGATE_IN=262 KEYCODE_NAVIGATE_IN value
     * @property {number} KEYCODE_NAVIGATE_OUT=263 KEYCODE_NAVIGATE_OUT value
     * @property {number} KEYCODE_STEM_PRIMARY=264 KEYCODE_STEM_PRIMARY value
     * @property {number} KEYCODE_STEM_1=265 KEYCODE_STEM_1 value
     * @property {number} KEYCODE_STEM_2=266 KEYCODE_STEM_2 value
     * @property {number} KEYCODE_STEM_3=267 KEYCODE_STEM_3 value
     * @property {number} KEYCODE_DPAD_UP_LEFT=268 KEYCODE_DPAD_UP_LEFT value
     * @property {number} KEYCODE_DPAD_DOWN_LEFT=269 KEYCODE_DPAD_DOWN_LEFT value
     * @property {number} KEYCODE_DPAD_UP_RIGHT=270 KEYCODE_DPAD_UP_RIGHT value
     * @property {number} KEYCODE_DPAD_DOWN_RIGHT=271 KEYCODE_DPAD_DOWN_RIGHT value
     * @property {number} KEYCODE_MEDIA_SKIP_FORWARD=272 KEYCODE_MEDIA_SKIP_FORWARD value
     * @property {number} KEYCODE_MEDIA_SKIP_BACKWARD=273 KEYCODE_MEDIA_SKIP_BACKWARD value
     * @property {number} KEYCODE_MEDIA_STEP_FORWARD=274 KEYCODE_MEDIA_STEP_FORWARD value
     * @property {number} KEYCODE_MEDIA_STEP_BACKWARD=275 KEYCODE_MEDIA_STEP_BACKWARD value
     * @property {number} KEYCODE_SOFT_SLEEP=276 KEYCODE_SOFT_SLEEP value
     * @property {number} KEYCODE_CUT=277 KEYCODE_CUT value
     * @property {number} KEYCODE_COPY=278 KEYCODE_COPY value
     * @property {number} KEYCODE_PASTE=279 KEYCODE_PASTE value
     * @property {number} KEYCODE_SYSTEM_NAVIGATION_UP=280 KEYCODE_SYSTEM_NAVIGATION_UP value
     * @property {number} KEYCODE_SYSTEM_NAVIGATION_DOWN=281 KEYCODE_SYSTEM_NAVIGATION_DOWN value
     * @property {number} KEYCODE_SYSTEM_NAVIGATION_LEFT=282 KEYCODE_SYSTEM_NAVIGATION_LEFT value
     * @property {number} KEYCODE_SYSTEM_NAVIGATION_RIGHT=283 KEYCODE_SYSTEM_NAVIGATION_RIGHT value
     * @property {number} KEYCODE_ALL_APPS=284 KEYCODE_ALL_APPS value
     * @property {number} KEYCODE_REFRESH=285 KEYCODE_REFRESH value
     * @property {number} KEYCODE_THUMBS_UP=286 KEYCODE_THUMBS_UP value
     * @property {number} KEYCODE_THUMBS_DOWN=287 KEYCODE_THUMBS_DOWN value
     * @property {number} KEYCODE_PROFILE_SWITCH=288 KEYCODE_PROFILE_SWITCH value
     * @property {number} KEYCODE_VIDEO_APP_1=289 KEYCODE_VIDEO_APP_1 value
     * @property {number} KEYCODE_VIDEO_APP_2=290 KEYCODE_VIDEO_APP_2 value
     * @property {number} KEYCODE_VIDEO_APP_3=291 KEYCODE_VIDEO_APP_3 value
     * @property {number} KEYCODE_VIDEO_APP_4=292 KEYCODE_VIDEO_APP_4 value
     * @property {number} KEYCODE_VIDEO_APP_5=293 KEYCODE_VIDEO_APP_5 value
     * @property {number} KEYCODE_VIDEO_APP_6=294 KEYCODE_VIDEO_APP_6 value
     * @property {number} KEYCODE_VIDEO_APP_7=295 KEYCODE_VIDEO_APP_7 value
     * @property {number} KEYCODE_VIDEO_APP_8=296 KEYCODE_VIDEO_APP_8 value
     * @property {number} KEYCODE_FEATURED_APP_1=297 KEYCODE_FEATURED_APP_1 value
     * @property {number} KEYCODE_FEATURED_APP_2=298 KEYCODE_FEATURED_APP_2 value
     * @property {number} KEYCODE_FEATURED_APP_3=299 KEYCODE_FEATURED_APP_3 value
     * @property {number} KEYCODE_FEATURED_APP_4=300 KEYCODE_FEATURED_APP_4 value
     * @property {number} KEYCODE_DEMO_APP_1=301 KEYCODE_DEMO_APP_1 value
     * @property {number} KEYCODE_DEMO_APP_2=302 KEYCODE_DEMO_APP_2 value
     * @property {number} KEYCODE_DEMO_APP_3=303 KEYCODE_DEMO_APP_3 value
     * @property {number} KEYCODE_DEMO_APP_4=304 KEYCODE_DEMO_APP_4 value
     */
    remote.RemoteKeyCode = (function() {
        var valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "KEYCODE_UNKNOWN"] = 0;
        values[valuesById[1] = "KEYCODE_SOFT_LEFT"] = 1;
        values[valuesById[2] = "KEYCODE_SOFT_RIGHT"] = 2;
        values[valuesById[3] = "KEYCODE_HOME"] = 3;
        values[valuesById[4] = "KEYCODE_BACK"] = 4;
        values[valuesById[5] = "KEYCODE_CALL"] = 5;
        values[valuesById[6] = "KEYCODE_ENDCALL"] = 6;
        values[valuesById[7] = "KEYCODE_0"] = 7;
        values[valuesById[8] = "KEYCODE_1"] = 8;
        values[valuesById[9] = "KEYCODE_2"] = 9;
        values[valuesById[10] = "KEYCODE_3"] = 10;
        values[valuesById[11] = "KEYCODE_4"] = 11;
        values[valuesById[12] = "KEYCODE_5"] = 12;
        values[valuesById[13] = "KEYCODE_6"] = 13;
        values[valuesById[14] = "KEYCODE_7"] = 14;
        values[valuesById[15] = "KEYCODE_8"] = 15;
        values[valuesById[16] = "KEYCODE_9"] = 16;
        values[valuesById[17] = "KEYCODE_STAR"] = 17;
        values[valuesById[18] = "KEYCODE_POUND"] = 18;
        values[valuesById[19] = "KEYCODE_DPAD_UP"] = 19;
        values[valuesById[20] = "KEYCODE_DPAD_DOWN"] = 20;
        values[valuesById[21] = "KEYCODE_DPAD_LEFT"] = 21;
        values[valuesById[22] = "KEYCODE_DPAD_RIGHT"] = 22;
        values[valuesById[23] = "KEYCODE_DPAD_CENTER"] = 23;
        values[valuesById[24] = "KEYCODE_VOLUME_UP"] = 24;
        values[valuesById[25] = "KEYCODE_VOLUME_DOWN"] = 25;
        values[valuesById[26] = "KEYCODE_POWER"] = 26;
        values[valuesById[27] = "KEYCODE_CAMERA"] = 27;
        values[valuesById[28] = "KEYCODE_CLEAR"] = 28;
        values[valuesById[29] = "KEYCODE_A"] = 29;
        values[valuesById[30] = "KEYCODE_B"] = 30;
        values[valuesById[31] = "KEYCODE_C"] = 31;
        values[valuesById[32] = "KEYCODE_D"] = 32;
        values[valuesById[33] = "KEYCODE_E"] = 33;
        values[valuesById[34] = "KEYCODE_F"] = 34;
        values[valuesById[35] = "KEYCODE_G"] = 35;
        values[valuesById[36] = "KEYCODE_H"] = 36;
        values[valuesById[37] = "KEYCODE_I"] = 37;
        values[valuesById[38] = "KEYCODE_J"] = 38;
        values[valuesById[39] = "KEYCODE_K"] = 39;
        values[valuesById[40] = "KEYCODE_L"] = 40;
        values[valuesById[41] = "KEYCODE_M"] = 41;
        values[valuesById[42] = "KEYCODE_N"] = 42;
        values[valuesById[43] = "KEYCODE_O"] = 43;
        values[valuesById[44] = "KEYCODE_P"] = 44;
        values[valuesById[45] = "KEYCODE_Q"] = 45;
        values[valuesById[46] = "KEYCODE_R"] = 46;
        values[valuesById[47] = "KEYCODE_S"] = 47;
        values[valuesById[48] = "KEYCODE_T"] = 48;
        values[valuesById[49] = "KEYCODE_U"] = 49;
        values[valuesById[50] = "KEYCODE_V"] = 50;
        values[valuesById[51] = "KEYCODE_W"] = 51;
        values[valuesById[52] = "KEYCODE_X"] = 52;
        values[valuesById[53] = "KEYCODE_Y"] = 53;
        values[valuesById[54] = "KEYCODE_Z"] = 54;
        values[valuesById[55] = "KEYCODE_COMMA"] = 55;
        values[valuesById[56] = "KEYCODE_PERIOD"] = 56;
        values[valuesById[57] = "KEYCODE_ALT_LEFT"] = 57;
        values[valuesById[58] = "KEYCODE_ALT_RIGHT"] = 58;
        values[valuesById[59] = "KEYCODE_SHIFT_LEFT"] = 59;
        values[valuesById[60] = "KEYCODE_SHIFT_RIGHT"] = 60;
        values[valuesById[61] = "KEYCODE_TAB"] = 61;
        values[valuesById[62] = "KEYCODE_SPACE"] = 62;
        values[valuesById[63] = "KEYCODE_SYM"] = 63;
        values[valuesById[64] = "KEYCODE_EXPLORER"] = 64;
        values[valuesById[65] = "KEYCODE_ENVELOPE"] = 65;
        values[valuesById[66] = "KEYCODE_ENTER"] = 66;
        values[valuesById[67] = "KEYCODE_DEL"] = 67;
        values[valuesById[68] = "KEYCODE_GRAVE"] = 68;
        values[valuesById[69] = "KEYCODE_MINUS"] = 69;
        values[valuesById[70] = "KEYCODE_EQUALS"] = 70;
        values[valuesById[71] = "KEYCODE_LEFT_BRACKET"] = 71;
        values[valuesById[72] = "KEYCODE_RIGHT_BRACKET"] = 72;
        values[valuesById[73] = "KEYCODE_BACKSLASH"] = 73;
        values[valuesById[74] = "KEYCODE_SEMICOLON"] = 74;
        values[valuesById[75] = "KEYCODE_APOSTROPHE"] = 75;
        values[valuesById[76] = "KEYCODE_SLASH"] = 76;
        values[valuesById[77] = "KEYCODE_AT"] = 77;
        values[valuesById[78] = "KEYCODE_NUM"] = 78;
        values[valuesById[79] = "KEYCODE_HEADSETHOOK"] = 79;
        values[valuesById[80] = "KEYCODE_FOCUS"] = 80;
        values[valuesById[81] = "KEYCODE_PLUS"] = 81;
        values[valuesById[82] = "KEYCODE_MENU"] = 82;
        values[valuesById[83] = "KEYCODE_NOTIFICATION"] = 83;
        values[valuesById[84] = "KEYCODE_SEARCH"] = 84;
        values[valuesById[85] = "KEYCODE_MEDIA_PLAY_PAUSE"] = 85;
        values[valuesById[86] = "KEYCODE_MEDIA_STOP"] = 86;
        values[valuesById[87] = "KEYCODE_MEDIA_NEXT"] = 87;
        values[valuesById[88] = "KEYCODE_MEDIA_PREVIOUS"] = 88;
        values[valuesById[89] = "KEYCODE_MEDIA_REWIND"] = 89;
        values[valuesById[90] = "KEYCODE_MEDIA_FAST_FORWARD"] = 90;
        values[valuesById[91] = "KEYCODE_MUTE"] = 91;
        values[valuesById[92] = "KEYCODE_PAGE_UP"] = 92;
        values[valuesById[93] = "KEYCODE_PAGE_DOWN"] = 93;
        values[valuesById[94] = "KEYCODE_PICTSYMBOLS"] = 94;
        values[valuesById[95] = "KEYCODE_SWITCH_CHARSET"] = 95;
        values[valuesById[96] = "KEYCODE_BUTTON_A"] = 96;
        values[valuesById[97] = "KEYCODE_BUTTON_B"] = 97;
        values[valuesById[98] = "KEYCODE_BUTTON_C"] = 98;
        values[valuesById[99] = "KEYCODE_BUTTON_X"] = 99;
        values[valuesById[100] = "KEYCODE_BUTTON_Y"] = 100;
        values[valuesById[101] = "KEYCODE_BUTTON_Z"] = 101;
        values[valuesById[102] = "KEYCODE_BUTTON_L1"] = 102;
        values[valuesById[103] = "KEYCODE_BUTTON_R1"] = 103;
        values[valuesById[104] = "KEYCODE_BUTTON_L2"] = 104;
        values[valuesById[105] = "KEYCODE_BUTTON_R2"] = 105;
        values[valuesById[106] = "KEYCODE_BUTTON_THUMBL"] = 106;
        values[valuesById[107] = "KEYCODE_BUTTON_THUMBR"] = 107;
        values[valuesById[108] = "KEYCODE_BUTTON_START"] = 108;
        values[valuesById[109] = "KEYCODE_BUTTON_SELECT"] = 109;
        values[valuesById[110] = "KEYCODE_BUTTON_MODE"] = 110;
        values[valuesById[111] = "KEYCODE_ESCAPE"] = 111;
        values[valuesById[112] = "KEYCODE_FORWARD_DEL"] = 112;
        values[valuesById[113] = "KEYCODE_CTRL_LEFT"] = 113;
        values[valuesById[114] = "KEYCODE_CTRL_RIGHT"] = 114;
        values[valuesById[115] = "KEYCODE_CAPS_LOCK"] = 115;
        values[valuesById[116] = "KEYCODE_SCROLL_LOCK"] = 116;
        values[valuesById[117] = "KEYCODE_META_LEFT"] = 117;
        values[valuesById[118] = "KEYCODE_META_RIGHT"] = 118;
        values[valuesById[119] = "KEYCODE_FUNCTION"] = 119;
        values[valuesById[120] = "KEYCODE_SYSRQ"] = 120;
        values[valuesById[121] = "KEYCODE_BREAK"] = 121;
        values[valuesById[122] = "KEYCODE_MOVE_HOME"] = 122;
        values[valuesById[123] = "KEYCODE_MOVE_END"] = 123;
        values[valuesById[124] = "KEYCODE_INSERT"] = 124;
        values[valuesById[125] = "KEYCODE_FORWARD"] = 125;
        values[valuesById[126] = "KEYCODE_MEDIA_PLAY"] = 126;
        values[valuesById[127] = "KEYCODE_MEDIA_PAUSE"] = 127;
        values[valuesById[128] = "KEYCODE_MEDIA_CLOSE"] = 128;
        values[valuesById[129] = "KEYCODE_MEDIA_EJECT"] = 129;
        values[valuesById[130] = "KEYCODE_MEDIA_RECORD"] = 130;
        values[valuesById[131] = "KEYCODE_F1"] = 131;
        values[valuesById[132] = "KEYCODE_F2"] = 132;
        values[valuesById[133] = "KEYCODE_F3"] = 133;
        values[valuesById[134] = "KEYCODE_F4"] = 134;
        values[valuesById[135] = "KEYCODE_F5"] = 135;
        values[valuesById[136] = "KEYCODE_F6"] = 136;
        values[valuesById[137] = "KEYCODE_F7"] = 137;
        values[valuesById[138] = "KEYCODE_F8"] = 138;
        values[valuesById[139] = "KEYCODE_F9"] = 139;
        values[valuesById[140] = "KEYCODE_F10"] = 140;
        values[valuesById[141] = "KEYCODE_F11"] = 141;
        values[valuesById[142] = "KEYCODE_F12"] = 142;
        values[valuesById[143] = "KEYCODE_NUM_LOCK"] = 143;
        values[valuesById[144] = "KEYCODE_NUMPAD_0"] = 144;
        values[valuesById[145] = "KEYCODE_NUMPAD_1"] = 145;
        values[valuesById[146] = "KEYCODE_NUMPAD_2"] = 146;
        values[valuesById[147] = "KEYCODE_NUMPAD_3"] = 147;
        values[valuesById[148] = "KEYCODE_NUMPAD_4"] = 148;
        values[valuesById[149] = "KEYCODE_NUMPAD_5"] = 149;
        values[valuesById[150] = "KEYCODE_NUMPAD_6"] = 150;
        values[valuesById[151] = "KEYCODE_NUMPAD_7"] = 151;
        values[valuesById[152] = "KEYCODE_NUMPAD_8"] = 152;
        values[valuesById[153] = "KEYCODE_NUMPAD_9"] = 153;
        values[valuesById[154] = "KEYCODE_NUMPAD_DIVIDE"] = 154;
        values[valuesById[155] = "KEYCODE_NUMPAD_MULTIPLY"] = 155;
        values[valuesById[156] = "KEYCODE_NUMPAD_SUBTRACT"] = 156;
        values[valuesById[157] = "KEYCODE_NUMPAD_ADD"] = 157;
        values[valuesById[158] = "KEYCODE_NUMPAD_DOT"] = 158;
        values[valuesById[159] = "KEYCODE_NUMPAD_COMMA"] = 159;
        values[valuesById[160] = "KEYCODE_NUMPAD_ENTER"] = 160;
        values[valuesById[161] = "KEYCODE_NUMPAD_EQUALS"] = 161;
        values[valuesById[162] = "KEYCODE_NUMPAD_LEFT_PAREN"] = 162;
        values[valuesById[163] = "KEYCODE_NUMPAD_RIGHT_PAREN"] = 163;
        values[valuesById[164] = "KEYCODE_VOLUME_MUTE"] = 164;
        values[valuesById[165] = "KEYCODE_INFO"] = 165;
        values[valuesById[166] = "KEYCODE_CHANNEL_UP"] = 166;
        values[valuesById[167] = "KEYCODE_CHANNEL_DOWN"] = 167;
        values[valuesById[168] = "KEYCODE_ZOOM_IN"] = 168;
        values[valuesById[169] = "KEYCODE_ZOOM_OUT"] = 169;
        values[valuesById[170] = "KEYCODE_TV"] = 170;
        values[valuesById[171] = "KEYCODE_WINDOW"] = 171;
        values[valuesById[172] = "KEYCODE_GUIDE"] = 172;
        values[valuesById[173] = "KEYCODE_DVR"] = 173;
        values[valuesById[174] = "KEYCODE_BOOKMARK"] = 174;
        values[valuesById[175] = "KEYCODE_CAPTIONS"] = 175;
        values[valuesById[176] = "KEYCODE_SETTINGS"] = 176;
        values[valuesById[177] = "KEYCODE_TV_POWER"] = 177;
        values[valuesById[178] = "KEYCODE_TV_INPUT"] = 178;
        values[valuesById[179] = "KEYCODE_STB_POWER"] = 179;
        values[valuesById[180] = "KEYCODE_STB_INPUT"] = 180;
        values[valuesById[181] = "KEYCODE_AVR_POWER"] = 181;
        values[valuesById[182] = "KEYCODE_AVR_INPUT"] = 182;
        values[valuesById[183] = "KEYCODE_PROG_RED"] = 183;
        values[valuesById[184] = "KEYCODE_PROG_GREEN"] = 184;
        values[valuesById[185] = "KEYCODE_PROG_YELLOW"] = 185;
        values[valuesById[186] = "KEYCODE_PROG_BLUE"] = 186;
        values[valuesById[187] = "KEYCODE_APP_SWITCH"] = 187;
        values[valuesById[188] = "KEYCODE_BUTTON_1"] = 188;
        values[valuesById[189] = "KEYCODE_BUTTON_2"] = 189;
        values[valuesById[190] = "KEYCODE_BUTTON_3"] = 190;
        values[valuesById[191] = "KEYCODE_BUTTON_4"] = 191;
        values[valuesById[192] = "KEYCODE_BUTTON_5"] = 192;
        values[valuesById[193] = "KEYCODE_BUTTON_6"] = 193;
        values[valuesById[194] = "KEYCODE_BUTTON_7"] = 194;
        values[valuesById[195] = "KEYCODE_BUTTON_8"] = 195;
        values[valuesById[196] = "KEYCODE_BUTTON_9"] = 196;
        values[valuesById[197] = "KEYCODE_BUTTON_10"] = 197;
        values[valuesById[198] = "KEYCODE_BUTTON_11"] = 198;
        values[valuesById[199] = "KEYCODE_BUTTON_12"] = 199;
        values[valuesById[200] = "KEYCODE_BUTTON_13"] = 200;
        values[valuesById[201] = "KEYCODE_BUTTON_14"] = 201;
        values[valuesById[202] = "KEYCODE_BUTTON_15"] = 202;
        values[valuesById[203] = "KEYCODE_BUTTON_16"] = 203;
        values[valuesById[204] = "KEYCODE_LANGUAGE_SWITCH"] = 204;
        values[valuesById[205] = "KEYCODE_MANNER_MODE"] = 205;
        values[valuesById[206] = "KEYCODE_3D_MODE"] = 206;
        values[valuesById[207] = "KEYCODE_CONTACTS"] = 207;
        values[valuesById[208] = "KEYCODE_CALENDAR"] = 208;
        values[valuesById[209] = "KEYCODE_MUSIC"] = 209;
        values[valuesById[210] = "KEYCODE_CALCULATOR"] = 210;
        values[valuesById[211] = "KEYCODE_ZENKAKU_HANKAKU"] = 211;
        values[valuesById[212] = "KEYCODE_EISU"] = 212;
        values[valuesById[213] = "KEYCODE_MUHENKAN"] = 213;
        values[valuesById[214] = "KEYCODE_HENKAN"] = 214;
        values[valuesById[215] = "KEYCODE_KATAKANA_HIRAGANA"] = 215;
        values[valuesById[216] = "KEYCODE_YEN"] = 216;
        values[valuesById[217] = "KEYCODE_RO"] = 217;
        values[valuesById[218] = "KEYCODE_KANA"] = 218;
        values[valuesById[219] = "KEYCODE_ASSIST"] = 219;
        values[valuesById[220] = "KEYCODE_BRIGHTNESS_DOWN"] = 220;
        values[valuesById[221] = "KEYCODE_BRIGHTNESS_UP"] = 221;
        values[valuesById[222] = "KEYCODE_MEDIA_AUDIO_TRACK"] = 222;
        values[valuesById[223] = "KEYCODE_SLEEP"] = 223;
        values[valuesById[224] = "KEYCODE_WAKEUP"] = 224;
        values[valuesById[225] = "KEYCODE_PAIRING"] = 225;
        values[valuesById[226] = "KEYCODE_MEDIA_TOP_MENU"] = 226;
        values[valuesById[227] = "KEYCODE_11"] = 227;
        values[valuesById[228] = "KEYCODE_12"] = 228;
        values[valuesById[229] = "KEYCODE_LAST_CHANNEL"] = 229;
        values[valuesById[230] = "KEYCODE_TV_DATA_SERVICE"] = 230;
        values[valuesById[231] = "KEYCODE_VOICE_ASSIST"] = 231;
        values[valuesById[232] = "KEYCODE_TV_RADIO"] = 232;
        values[valuesById[233] = "KEYCODE_TV_TELETEXT"] = 233;
        values[valuesById[234] = "KEYCODE_TV_NUMBER_ENTRY"] = 234;
        values[valuesById[235] = "KEYCODE_TV_TERRESTRIAL_ANALOG"] = 235;
        values[valuesById[236] = "KEYCODE_TV_TERRESTRIAL_DIGITAL"] = 236;
        values[valuesById[237] = "KEYCODE_TV_SATELLITE"] = 237;
        values[valuesById[238] = "KEYCODE_TV_SATELLITE_BS"] = 238;
        values[valuesById[239] = "KEYCODE_TV_SATELLITE_CS"] = 239;
        values[valuesById[240] = "KEYCODE_TV_SATELLITE_SERVICE"] = 240;
        values[valuesById[241] = "KEYCODE_TV_NETWORK"] = 241;
        values[valuesById[242] = "KEYCODE_TV_ANTENNA_CABLE"] = 242;
        values[valuesById[243] = "KEYCODE_TV_INPUT_HDMI_1"] = 243;
        values[valuesById[244] = "KEYCODE_TV_INPUT_HDMI_2"] = 244;
        values[valuesById[245] = "KEYCODE_TV_INPUT_HDMI_3"] = 245;
        values[valuesById[246] = "KEYCODE_TV_INPUT_HDMI_4"] = 246;
        values[valuesById[247] = "KEYCODE_TV_INPUT_COMPOSITE_1"] = 247;
        values[valuesById[248] = "KEYCODE_TV_INPUT_COMPOSITE_2"] = 248;
        values[valuesById[249] = "KEYCODE_TV_INPUT_COMPONENT_1"] = 249;
        values[valuesById[250] = "KEYCODE_TV_INPUT_COMPONENT_2"] = 250;
        values[valuesById[251] = "KEYCODE_TV_INPUT_VGA_1"] = 251;
        values[valuesById[252] = "KEYCODE_TV_AUDIO_DESCRIPTION"] = 252;
        values[valuesById[253] = "KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP"] = 253;
        values[valuesById[254] = "KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN"] = 254;
        values[valuesById[255] = "KEYCODE_TV_ZOOM_MODE"] = 255;
        values[valuesById[256] = "KEYCODE_TV_CONTENTS_MENU"] = 256;
        values[valuesById[257] = "KEYCODE_TV_MEDIA_CONTEXT_MENU"] = 257;
        values[valuesById[258] = "KEYCODE_TV_TIMER_PROGRAMMING"] = 258;
        values[valuesById[259] = "KEYCODE_HELP"] = 259;
        values[valuesById[260] = "KEYCODE_NAVIGATE_PREVIOUS"] = 260;
        values[valuesById[261] = "KEYCODE_NAVIGATE_NEXT"] = 261;
        values[valuesById[262] = "KEYCODE_NAVIGATE_IN"] = 262;
        values[valuesById[263] = "KEYCODE_NAVIGATE_OUT"] = 263;
        values[valuesById[264] = "KEYCODE_STEM_PRIMARY"] = 264;
        values[valuesById[265] = "KEYCODE_STEM_1"] = 265;
        values[valuesById[266] = "KEYCODE_STEM_2"] = 266;
        values[valuesById[267] = "KEYCODE_STEM_3"] = 267;
        values[valuesById[268] = "KEYCODE_DPAD_UP_LEFT"] = 268;
        values[valuesById[269] = "KEYCODE_DPAD_DOWN_LEFT"] = 269;
        values[valuesById[270] = "KEYCODE_DPAD_UP_RIGHT"] = 270;
        values[valuesById[271] = "KEYCODE_DPAD_DOWN_RIGHT"] = 271;
        values[valuesById[272] = "KEYCODE_MEDIA_SKIP_FORWARD"] = 272;
        values[valuesById[273] = "KEYCODE_MEDIA_SKIP_BACKWARD"] = 273;
        values[valuesById[274] = "KEYCODE_MEDIA_STEP_FORWARD"] = 274;
        values[valuesById[275] = "KEYCODE_MEDIA_STEP_BACKWARD"] = 275;
        values[valuesById[276] = "KEYCODE_SOFT_SLEEP"] = 276;
        values[valuesById[277] = "KEYCODE_CUT"] = 277;
        values[valuesById[278] = "KEYCODE_COPY"] = 278;
        values[valuesById[279] = "KEYCODE_PASTE"] = 279;
        values[valuesById[280] = "KEYCODE_SYSTEM_NAVIGATION_UP"] = 280;
        values[valuesById[281] = "KEYCODE_SYSTEM_NAVIGATION_DOWN"] = 281;
        values[valuesById[282] = "KEYCODE_SYSTEM_NAVIGATION_LEFT"] = 282;
        values[valuesById[283] = "KEYCODE_SYSTEM_NAVIGATION_RIGHT"] = 283;
        values[valuesById[284] = "KEYCODE_ALL_APPS"] = 284;
        values[valuesById[285] = "KEYCODE_REFRESH"] = 285;
        values[valuesById[286] = "KEYCODE_THUMBS_UP"] = 286;
        values[valuesById[287] = "KEYCODE_THUMBS_DOWN"] = 287;
        values[valuesById[288] = "KEYCODE_PROFILE_SWITCH"] = 288;
        values[valuesById[289] = "KEYCODE_VIDEO_APP_1"] = 289;
        values[valuesById[290] = "KEYCODE_VIDEO_APP_2"] = 290;
        values[valuesById[291] = "KEYCODE_VIDEO_APP_3"] = 291;
        values[valuesById[292] = "KEYCODE_VIDEO_APP_4"] = 292;
        values[valuesById[293] = "KEYCODE_VIDEO_APP_5"] = 293;
        values[valuesById[294] = "KEYCODE_VIDEO_APP_6"] = 294;
        values[valuesById[295] = "KEYCODE_VIDEO_APP_7"] = 295;
        values[valuesById[296] = "KEYCODE_VIDEO_APP_8"] = 296;
        values[valuesById[297] = "KEYCODE_FEATURED_APP_1"] = 297;
        values[valuesById[298] = "KEYCODE_FEATURED_APP_2"] = 298;
        values[valuesById[299] = "KEYCODE_FEATURED_APP_3"] = 299;
        values[valuesById[300] = "KEYCODE_FEATURED_APP_4"] = 300;
        values[valuesById[301] = "KEYCODE_DEMO_APP_1"] = 301;
        values[valuesById[302] = "KEYCODE_DEMO_APP_2"] = 302;
        values[valuesById[303] = "KEYCODE_DEMO_APP_3"] = 303;
        values[valuesById[304] = "KEYCODE_DEMO_APP_4"] = 304;
        return values;
    })();

    return remote;
})();

$root.pairing = (function() {

    /**
     * Namespace pairing.
     * @exports pairing
     * @namespace
     */
    var pairing = {};

    /**
     * Status enum.
     * @name pairing.Status
     * @enum {number}
     * @property {number} STATUS_OK=200 STATUS_OK value
     * @property {number} STATUS_ERROR=400 STATUS_ERROR value
     * @property {number} STATUS_BAD_CONFIGURATION=401 STATUS_BAD_CONFIGURATION value
     */
    pairing.Status = (function() {
        var valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[200] = "STATUS_OK"] = 200;
        values[valuesById[400] = "STATUS_ERROR"] = 400;
        values[valuesById[401] = "STATUS_BAD_CONFIGURATION"] = 401;
        return values;
    })();

    /**
     * RoleType enum.
     * @name pairing.RoleType
     * @enum {number}
     * @property {number} ROLE_TYPE_UNKNOWN=0 ROLE_TYPE_UNKNOWN value
     * @property {number} ROLE_TYPE_INPUT=1 ROLE_TYPE_INPUT value
     * @property {number} ROLE_TYPE_OUTPUT=2 ROLE_TYPE_OUTPUT value
     */
    pairing.RoleType = (function() {
        var valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "ROLE_TYPE_UNKNOWN"] = 0;
        values[valuesById[1] = "ROLE_TYPE_INPUT"] = 1;
        values[valuesById[2] = "ROLE_TYPE_OUTPUT"] = 2;
        return values;
    })();

    /**
     * EncodingType enum.
     * @name pairing.EncodingType
     * @enum {number}
     * @property {number} ENCODING_TYPE_UNKNOWN=0 ENCODING_TYPE_UNKNOWN value
     * @property {number} ENCODING_TYPE_ALPHANUMERIC=1 ENCODING_TYPE_ALPHANUMERIC value
     * @property {number} ENCODING_TYPE_NUMERIC=2 ENCODING_TYPE_NUMERIC value
     * @property {number} ENCODING_TYPE_HEXADECIMAL=3 ENCODING_TYPE_HEXADECIMAL value
     * @property {number} ENCODING_TYPE_QRCODE=4 ENCODING_TYPE_QRCODE value
     */
    pairing.EncodingType = (function() {
        var valuesById = $Object.create(null), values = $Object.create(valuesById);
        values[valuesById[0] = "ENCODING_TYPE_UNKNOWN"] = 0;
        values[valuesById[1] = "ENCODING_TYPE_ALPHANUMERIC"] = 1;
        values[valuesById[2] = "ENCODING_TYPE_NUMERIC"] = 2;
        values[valuesById[3] = "ENCODING_TYPE_HEXADECIMAL"] = 3;
        values[valuesById[4] = "ENCODING_TYPE_QRCODE"] = 4;
        return values;
    })();

    pairing.PairingRequest = (function() {

        /**
         * Properties of a PairingRequest.
         * @typedef {Object} pairing.PairingRequest.$Properties
         * @property {string|null} [serviceName] PairingRequest serviceName
         * @property {string|null} [clientName] PairingRequest clientName
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PairingRequest.
         * @memberof pairing
         * @interface IPairingRequest
         * @augments pairing.PairingRequest.$Properties
         * @deprecated Use pairing.PairingRequest.$Properties instead.
         */

        /**
         * Shape of a PairingRequest.
         * @typedef {pairing.PairingRequest.$Properties} pairing.PairingRequest.$Shape
         */

        /**
         * Constructs a new PairingRequest.
         * @memberof pairing
         * @classdesc Represents a PairingRequest.
         * @constructor
         * @param {pairing.PairingRequest.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PairingRequest = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * PairingRequest serviceName.
         * @member {string} serviceName
         * @memberof pairing.PairingRequest
         * @instance
         */
        PairingRequest.prototype.serviceName = "";

        /**
         * PairingRequest clientName.
         * @member {string} clientName
         * @memberof pairing.PairingRequest
         * @instance
         */
        PairingRequest.prototype.clientName = "";

        /**
         * Creates a new PairingRequest instance using the specified properties.
         * @function create
         * @memberof pairing.PairingRequest
         * @static
         * @param {pairing.PairingRequest.$Properties=} [properties] Properties to set
         * @returns {pairing.PairingRequest} PairingRequest instance
         * @type {{
         *   (properties: pairing.PairingRequest.$Shape): pairing.PairingRequest & pairing.PairingRequest.$Shape;
         *   (properties?: pairing.PairingRequest.$Properties): pairing.PairingRequest;
         * }}
         */
        PairingRequest.create = function(properties) {
            return new PairingRequest(properties);
        };

        /**
         * Encodes the specified PairingRequest message. Does not implicitly {@link pairing.PairingRequest.verify|verify} messages.
         * @function encode
         * @memberof pairing.PairingRequest
         * @static
         * @param {pairing.PairingRequest.$Properties} message PairingRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingRequest.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.serviceName != null && $Object.hasOwnProperty.call(message, "serviceName") && message.serviceName !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.serviceName);
            if (message.clientName != null && $Object.hasOwnProperty.call(message, "clientName") && message.clientName !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.clientName);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PairingRequest message, length delimited. Does not implicitly {@link pairing.PairingRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pairing.PairingRequest
         * @static
         * @param {pairing.PairingRequest.$Properties} message PairingRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingRequest.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PairingRequest message from the specified reader or buffer.
         * @function decode
         * @memberof pairing.PairingRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pairing.PairingRequest & pairing.PairingRequest.$Shape} PairingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingRequest.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.pairing.PairingRequest(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.serviceName = value;
                        else
                            delete message.serviceName;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.clientName = value;
                        else
                            delete message.clientName;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PairingRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pairing.PairingRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pairing.PairingRequest & pairing.PairingRequest.$Shape} PairingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingRequest.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PairingRequest message.
         * @function verify
         * @memberof pairing.PairingRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PairingRequest.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.serviceName != null && $Object.hasOwnProperty.call(message, "serviceName"))
                if (!$util.isString(message.serviceName))
                    return "serviceName: string expected";
            if (message.clientName != null && $Object.hasOwnProperty.call(message, "clientName"))
                if (!$util.isString(message.clientName))
                    return "clientName: string expected";
            return null;
        };

        /**
         * Creates a PairingRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pairing.PairingRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pairing.PairingRequest} PairingRequest
         */
        PairingRequest.fromObject = function (object, _depth) {
            if (object instanceof $root.pairing.PairingRequest)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".pairing.PairingRequest: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.pairing.PairingRequest();
            if (object.serviceName != null)
                if (typeof object.serviceName !== "string" || object.serviceName.length)
                    message.serviceName = $String(object.serviceName);
            if (object.clientName != null)
                if (typeof object.clientName !== "string" || object.clientName.length)
                    message.clientName = $String(object.clientName);
            return message;
        };

        /**
         * Creates a plain object from a PairingRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pairing.PairingRequest
         * @static
         * @param {pairing.PairingRequest} message PairingRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PairingRequest.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.serviceName = "";
                object.clientName = "";
            }
            if (message.serviceName != null && $Object.hasOwnProperty.call(message, "serviceName"))
                object.serviceName = message.serviceName;
            if (message.clientName != null && $Object.hasOwnProperty.call(message, "clientName"))
                object.clientName = message.clientName;
            return object;
        };

        /**
         * Converts this PairingRequest to JSON.
         * @function toJSON
         * @memberof pairing.PairingRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PairingRequest.prototype.toJSON = function() {
            return PairingRequest.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PairingRequest
         * @function getTypeUrl
         * @memberof pairing.PairingRequest
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PairingRequest.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/pairing.PairingRequest";
        };

        return PairingRequest;
    })();

    pairing.PairingRequestAck = (function() {

        /**
         * Properties of a PairingRequestAck.
         * @typedef {Object} pairing.PairingRequestAck.$Properties
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PairingRequestAck.
         * @memberof pairing
         * @interface IPairingRequestAck
         * @augments pairing.PairingRequestAck.$Properties
         * @deprecated Use pairing.PairingRequestAck.$Properties instead.
         */

        /**
         * Shape of a PairingRequestAck.
         * @typedef {pairing.PairingRequestAck.$Properties} pairing.PairingRequestAck.$Shape
         */

        /**
         * Constructs a new PairingRequestAck.
         * @memberof pairing
         * @classdesc Represents a PairingRequestAck.
         * @constructor
         * @param {pairing.PairingRequestAck.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PairingRequestAck = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Creates a new PairingRequestAck instance using the specified properties.
         * @function create
         * @memberof pairing.PairingRequestAck
         * @static
         * @param {pairing.PairingRequestAck.$Properties=} [properties] Properties to set
         * @returns {pairing.PairingRequestAck} PairingRequestAck instance
         * @type {{
         *   (properties: pairing.PairingRequestAck.$Shape): pairing.PairingRequestAck & pairing.PairingRequestAck.$Shape;
         *   (properties?: pairing.PairingRequestAck.$Properties): pairing.PairingRequestAck;
         * }}
         */
        PairingRequestAck.create = function(properties) {
            return new PairingRequestAck(properties);
        };

        /**
         * Encodes the specified PairingRequestAck message. Does not implicitly {@link pairing.PairingRequestAck.verify|verify} messages.
         * @function encode
         * @memberof pairing.PairingRequestAck
         * @static
         * @param {pairing.PairingRequestAck.$Properties} message PairingRequestAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingRequestAck.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PairingRequestAck message, length delimited. Does not implicitly {@link pairing.PairingRequestAck.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pairing.PairingRequestAck
         * @static
         * @param {pairing.PairingRequestAck.$Properties} message PairingRequestAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingRequestAck.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PairingRequestAck message from the specified reader or buffer.
         * @function decode
         * @memberof pairing.PairingRequestAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pairing.PairingRequestAck & pairing.PairingRequestAck.$Shape} PairingRequestAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingRequestAck.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.pairing.PairingRequestAck();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                reader.skipType(tag & 7, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PairingRequestAck message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pairing.PairingRequestAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pairing.PairingRequestAck & pairing.PairingRequestAck.$Shape} PairingRequestAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingRequestAck.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PairingRequestAck message.
         * @function verify
         * @memberof pairing.PairingRequestAck
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PairingRequestAck.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            return null;
        };

        /**
         * Creates a PairingRequestAck message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pairing.PairingRequestAck
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pairing.PairingRequestAck} PairingRequestAck
         */
        PairingRequestAck.fromObject = function (object, _depth) {
            if (object instanceof $root.pairing.PairingRequestAck)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".pairing.PairingRequestAck: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            return new $root.pairing.PairingRequestAck();
        };

        /**
         * Creates a plain object from a PairingRequestAck message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pairing.PairingRequestAck
         * @static
         * @param {pairing.PairingRequestAck} message PairingRequestAck
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PairingRequestAck.toObject = function () {
            return {};
        };

        /**
         * Converts this PairingRequestAck to JSON.
         * @function toJSON
         * @memberof pairing.PairingRequestAck
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PairingRequestAck.prototype.toJSON = function() {
            return PairingRequestAck.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PairingRequestAck
         * @function getTypeUrl
         * @memberof pairing.PairingRequestAck
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PairingRequestAck.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/pairing.PairingRequestAck";
        };

        return PairingRequestAck;
    })();

    pairing.PairingEncoding = (function() {

        /**
         * Properties of a PairingEncoding.
         * @typedef {Object} pairing.PairingEncoding.$Properties
         * @property {pairing.EncodingType|null} [type] PairingEncoding type
         * @property {number|null} [symbolLength] PairingEncoding symbolLength
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PairingEncoding.
         * @memberof pairing
         * @interface IPairingEncoding
         * @augments pairing.PairingEncoding.$Properties
         * @deprecated Use pairing.PairingEncoding.$Properties instead.
         */

        /**
         * Shape of a PairingEncoding.
         * @typedef {pairing.PairingEncoding.$Properties} pairing.PairingEncoding.$Shape
         */

        /**
         * Constructs a new PairingEncoding.
         * @memberof pairing
         * @classdesc Represents a PairingEncoding.
         * @constructor
         * @param {pairing.PairingEncoding.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PairingEncoding = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * PairingEncoding type.
         * @member {pairing.EncodingType} type
         * @memberof pairing.PairingEncoding
         * @instance
         */
        PairingEncoding.prototype.type = 0;

        /**
         * PairingEncoding symbolLength.
         * @member {number} symbolLength
         * @memberof pairing.PairingEncoding
         * @instance
         */
        PairingEncoding.prototype.symbolLength = 0;

        /**
         * Creates a new PairingEncoding instance using the specified properties.
         * @function create
         * @memberof pairing.PairingEncoding
         * @static
         * @param {pairing.PairingEncoding.$Properties=} [properties] Properties to set
         * @returns {pairing.PairingEncoding} PairingEncoding instance
         * @type {{
         *   (properties: pairing.PairingEncoding.$Shape): pairing.PairingEncoding & pairing.PairingEncoding.$Shape;
         *   (properties?: pairing.PairingEncoding.$Properties): pairing.PairingEncoding;
         * }}
         */
        PairingEncoding.create = function(properties) {
            return new PairingEncoding(properties);
        };

        /**
         * Encodes the specified PairingEncoding message. Does not implicitly {@link pairing.PairingEncoding.verify|verify} messages.
         * @function encode
         * @memberof pairing.PairingEncoding
         * @static
         * @param {pairing.PairingEncoding.$Properties} message PairingEncoding message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingEncoding.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.type != null && $Object.hasOwnProperty.call(message, "type") && message.type !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.symbolLength != null && $Object.hasOwnProperty.call(message, "symbolLength") && message.symbolLength !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.symbolLength);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PairingEncoding message, length delimited. Does not implicitly {@link pairing.PairingEncoding.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pairing.PairingEncoding
         * @static
         * @param {pairing.PairingEncoding.$Properties} message PairingEncoding message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingEncoding.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PairingEncoding message from the specified reader or buffer.
         * @function decode
         * @memberof pairing.PairingEncoding
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pairing.PairingEncoding & pairing.PairingEncoding.$Shape} PairingEncoding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingEncoding.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.pairing.PairingEncoding(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.type = value;
                        else
                            delete message.type;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.symbolLength = value;
                        else
                            delete message.symbolLength;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PairingEncoding message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pairing.PairingEncoding
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pairing.PairingEncoding & pairing.PairingEncoding.$Shape} PairingEncoding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingEncoding.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PairingEncoding message.
         * @function verify
         * @memberof pairing.PairingEncoding
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PairingEncoding.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                if (typeof message.type !== "number" || (message.type | 0) !== message.type)
                    return "type: enum value expected";
            if (message.symbolLength != null && $Object.hasOwnProperty.call(message, "symbolLength"))
                if (!$util.isInteger(message.symbolLength))
                    return "symbolLength: integer expected";
            return null;
        };

        /**
         * Creates a PairingEncoding message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pairing.PairingEncoding
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pairing.PairingEncoding} PairingEncoding
         */
        PairingEncoding.fromObject = function (object, _depth) {
            if (object instanceof $root.pairing.PairingEncoding)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".pairing.PairingEncoding: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.pairing.PairingEncoding();
            if (object.type !== 0 && (typeof object.type !== "string" || $root.pairing.EncodingType[object.type] !== 0))
                switch (object.type) {
                case "ENCODING_TYPE_UNKNOWN":
                case 0:
                    message.type = 0;
                    break;
                case "ENCODING_TYPE_ALPHANUMERIC":
                case 1:
                    message.type = 1;
                    break;
                case "ENCODING_TYPE_NUMERIC":
                case 2:
                    message.type = 2;
                    break;
                case "ENCODING_TYPE_HEXADECIMAL":
                case 3:
                    message.type = 3;
                    break;
                case "ENCODING_TYPE_QRCODE":
                case 4:
                    message.type = 4;
                    break;
                default:
                    if (typeof object.type === "number" && (object.type | 0) === object.type)
                        message.type = object.type;
                }
            if (object.symbolLength != null)
                if ($Number(object.symbolLength) !== 0)
                    message.symbolLength = object.symbolLength | 0;
            return message;
        };

        /**
         * Creates a plain object from a PairingEncoding message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pairing.PairingEncoding
         * @static
         * @param {pairing.PairingEncoding} message PairingEncoding
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PairingEncoding.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.type = options.enums === $String ? "ENCODING_TYPE_UNKNOWN" : 0;
                object.symbolLength = 0;
            }
            if (message.type != null && $Object.hasOwnProperty.call(message, "type"))
                object.type = options.enums === $String ? $root.pairing.EncodingType[message.type] === $undefined ? message.type : $root.pairing.EncodingType[message.type] : message.type;
            if (message.symbolLength != null && $Object.hasOwnProperty.call(message, "symbolLength"))
                object.symbolLength = message.symbolLength;
            return object;
        };

        /**
         * Converts this PairingEncoding to JSON.
         * @function toJSON
         * @memberof pairing.PairingEncoding
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PairingEncoding.prototype.toJSON = function() {
            return PairingEncoding.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PairingEncoding
         * @function getTypeUrl
         * @memberof pairing.PairingEncoding
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PairingEncoding.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/pairing.PairingEncoding";
        };

        return PairingEncoding;
    })();

    pairing.PairingOption = (function() {

        /**
         * Properties of a PairingOption.
         * @typedef {Object} pairing.PairingOption.$Properties
         * @property {number|null} [preferredRole] PairingOption preferredRole
         * @property {Array.<pairing.PairingEncoding.$Properties>|null} [outputEncodings] PairingOption outputEncodings
         * @property {Array.<pairing.PairingEncoding.$Properties>|null} [inputEncodings] PairingOption inputEncodings
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PairingOption.
         * @memberof pairing
         * @interface IPairingOption
         * @augments pairing.PairingOption.$Properties
         * @deprecated Use pairing.PairingOption.$Properties instead.
         */

        /**
         * Shape of a PairingOption.
         * @typedef {pairing.PairingOption.$Properties} pairing.PairingOption.$Shape
         */

        /**
         * Constructs a new PairingOption.
         * @memberof pairing
         * @classdesc Represents a PairingOption.
         * @constructor
         * @param {pairing.PairingOption.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PairingOption = function (properties) {
            this.outputEncodings = [];
            this.inputEncodings = [];
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * PairingOption preferredRole.
         * @member {number} preferredRole
         * @memberof pairing.PairingOption
         * @instance
         */
        PairingOption.prototype.preferredRole = 0;

        /**
         * PairingOption outputEncodings.
         * @member {Array.<pairing.PairingEncoding.$Properties>} outputEncodings
         * @memberof pairing.PairingOption
         * @instance
         */
        PairingOption.prototype.outputEncodings = $util.emptyArray;

        /**
         * PairingOption inputEncodings.
         * @member {Array.<pairing.PairingEncoding.$Properties>} inputEncodings
         * @memberof pairing.PairingOption
         * @instance
         */
        PairingOption.prototype.inputEncodings = $util.emptyArray;

        /**
         * Creates a new PairingOption instance using the specified properties.
         * @function create
         * @memberof pairing.PairingOption
         * @static
         * @param {pairing.PairingOption.$Properties=} [properties] Properties to set
         * @returns {pairing.PairingOption} PairingOption instance
         * @type {{
         *   (properties: pairing.PairingOption.$Shape): pairing.PairingOption & pairing.PairingOption.$Shape;
         *   (properties?: pairing.PairingOption.$Properties): pairing.PairingOption;
         * }}
         */
        PairingOption.create = function(properties) {
            return new PairingOption(properties);
        };

        /**
         * Encodes the specified PairingOption message. Does not implicitly {@link pairing.PairingOption.verify|verify} messages.
         * @function encode
         * @memberof pairing.PairingOption
         * @static
         * @param {pairing.PairingOption.$Properties} message PairingOption message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingOption.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.preferredRole != null && $Object.hasOwnProperty.call(message, "preferredRole") && message.preferredRole !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.preferredRole);
            if (message.outputEncodings != null && message.outputEncodings.length)
                for (var i = 0; i < message.outputEncodings.length; ++i)
                    $root.pairing.PairingEncoding.encode(message.outputEncodings[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.inputEncodings != null && message.inputEncodings.length)
                for (var i = 0; i < message.inputEncodings.length; ++i)
                    $root.pairing.PairingEncoding.encode(message.inputEncodings[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PairingOption message, length delimited. Does not implicitly {@link pairing.PairingOption.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pairing.PairingOption
         * @static
         * @param {pairing.PairingOption.$Properties} message PairingOption message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingOption.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PairingOption message from the specified reader or buffer.
         * @function decode
         * @memberof pairing.PairingOption
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pairing.PairingOption & pairing.PairingOption.$Shape} PairingOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingOption.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.pairing.PairingOption(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.preferredRole = value;
                        else
                            delete message.preferredRole;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if (!(message.outputEncodings && message.outputEncodings.length))
                            message.outputEncodings = [];
                        message.outputEncodings.push($root.pairing.PairingEncoding.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if (!(message.inputEncodings && message.inputEncodings.length))
                            message.inputEncodings = [];
                        message.inputEncodings.push($root.pairing.PairingEncoding.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PairingOption message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pairing.PairingOption
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pairing.PairingOption & pairing.PairingOption.$Shape} PairingOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingOption.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PairingOption message.
         * @function verify
         * @memberof pairing.PairingOption
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PairingOption.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.preferredRole != null && $Object.hasOwnProperty.call(message, "preferredRole"))
                if (!$util.isInteger(message.preferredRole))
                    return "preferredRole: integer expected";
            if (message.outputEncodings != null && $Object.hasOwnProperty.call(message, "outputEncodings")) {
                if (!$Array.isArray(message.outputEncodings))
                    return "outputEncodings: array expected";
                for (var i = 0; i < message.outputEncodings.length; ++i) {
                    var error = $root.pairing.PairingEncoding.verify(message.outputEncodings[i], _depth + 1);
                    if (error)
                        return "outputEncodings." + error;
                }
            }
            if (message.inputEncodings != null && $Object.hasOwnProperty.call(message, "inputEncodings")) {
                if (!$Array.isArray(message.inputEncodings))
                    return "inputEncodings: array expected";
                for (var i = 0; i < message.inputEncodings.length; ++i) {
                    var error = $root.pairing.PairingEncoding.verify(message.inputEncodings[i], _depth + 1);
                    if (error)
                        return "inputEncodings." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PairingOption message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pairing.PairingOption
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pairing.PairingOption} PairingOption
         */
        PairingOption.fromObject = function (object, _depth) {
            if (object instanceof $root.pairing.PairingOption)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".pairing.PairingOption: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.pairing.PairingOption();
            if (object.preferredRole != null)
                if ($Number(object.preferredRole) !== 0)
                    message.preferredRole = object.preferredRole | 0;
            if (object.outputEncodings) {
                if (!$Array.isArray(object.outputEncodings))
                    throw $TypeError(".pairing.PairingOption.outputEncodings: array expected");
                message.outputEncodings = $Array(object.outputEncodings.length);
                for (var i = 0; i < object.outputEncodings.length; ++i) {
                    if (!$util.isObject(object.outputEncodings[i]))
                        throw $TypeError(".pairing.PairingOption.outputEncodings: object expected");
                    message.outputEncodings[i] = $root.pairing.PairingEncoding.fromObject(object.outputEncodings[i], _depth + 1);
                }
            }
            if (object.inputEncodings) {
                if (!$Array.isArray(object.inputEncodings))
                    throw $TypeError(".pairing.PairingOption.inputEncodings: array expected");
                message.inputEncodings = $Array(object.inputEncodings.length);
                for (var i = 0; i < object.inputEncodings.length; ++i) {
                    if (!$util.isObject(object.inputEncodings[i]))
                        throw $TypeError(".pairing.PairingOption.inputEncodings: object expected");
                    message.inputEncodings[i] = $root.pairing.PairingEncoding.fromObject(object.inputEncodings[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PairingOption message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pairing.PairingOption
         * @static
         * @param {pairing.PairingOption} message PairingOption
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PairingOption.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.arrays || options.defaults) {
                object.outputEncodings = [];
                object.inputEncodings = [];
            }
            if (options.defaults)
                object.preferredRole = 0;
            if (message.preferredRole != null && $Object.hasOwnProperty.call(message, "preferredRole"))
                object.preferredRole = message.preferredRole;
            if (message.outputEncodings && message.outputEncodings.length) {
                object.outputEncodings = $Array(message.outputEncodings.length);
                for (var j = 0; j < message.outputEncodings.length; ++j)
                    object.outputEncodings[j] = $root.pairing.PairingEncoding.toObject(message.outputEncodings[j], options, _depth + 1);
            }
            if (message.inputEncodings && message.inputEncodings.length) {
                object.inputEncodings = $Array(message.inputEncodings.length);
                for (var j = 0; j < message.inputEncodings.length; ++j)
                    object.inputEncodings[j] = $root.pairing.PairingEncoding.toObject(message.inputEncodings[j], options, _depth + 1);
            }
            return object;
        };

        /**
         * Converts this PairingOption to JSON.
         * @function toJSON
         * @memberof pairing.PairingOption
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PairingOption.prototype.toJSON = function() {
            return PairingOption.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PairingOption
         * @function getTypeUrl
         * @memberof pairing.PairingOption
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PairingOption.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/pairing.PairingOption";
        };

        return PairingOption;
    })();

    pairing.PairingConfiguration = (function() {

        /**
         * Properties of a PairingConfiguration.
         * @typedef {Object} pairing.PairingConfiguration.$Properties
         * @property {pairing.PairingEncoding.$Properties|null} [encoding] PairingConfiguration encoding
         * @property {pairing.RoleType|null} [clientRole] PairingConfiguration clientRole
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PairingConfiguration.
         * @memberof pairing
         * @interface IPairingConfiguration
         * @augments pairing.PairingConfiguration.$Properties
         * @deprecated Use pairing.PairingConfiguration.$Properties instead.
         */

        /**
         * Shape of a PairingConfiguration.
         * @typedef {pairing.PairingConfiguration.$Properties} pairing.PairingConfiguration.$Shape
         */

        /**
         * Constructs a new PairingConfiguration.
         * @memberof pairing
         * @classdesc Represents a PairingConfiguration.
         * @constructor
         * @param {pairing.PairingConfiguration.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PairingConfiguration = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * PairingConfiguration encoding.
         * @member {pairing.PairingEncoding.$Properties|null|undefined} encoding
         * @memberof pairing.PairingConfiguration
         * @instance
         */
        PairingConfiguration.prototype.encoding = null;

        /**
         * PairingConfiguration clientRole.
         * @member {pairing.RoleType} clientRole
         * @memberof pairing.PairingConfiguration
         * @instance
         */
        PairingConfiguration.prototype.clientRole = 0;

        /**
         * Creates a new PairingConfiguration instance using the specified properties.
         * @function create
         * @memberof pairing.PairingConfiguration
         * @static
         * @param {pairing.PairingConfiguration.$Properties=} [properties] Properties to set
         * @returns {pairing.PairingConfiguration} PairingConfiguration instance
         * @type {{
         *   (properties: pairing.PairingConfiguration.$Shape): pairing.PairingConfiguration & pairing.PairingConfiguration.$Shape;
         *   (properties?: pairing.PairingConfiguration.$Properties): pairing.PairingConfiguration;
         * }}
         */
        PairingConfiguration.create = function(properties) {
            return new PairingConfiguration(properties);
        };

        /**
         * Encodes the specified PairingConfiguration message. Does not implicitly {@link pairing.PairingConfiguration.verify|verify} messages.
         * @function encode
         * @memberof pairing.PairingConfiguration
         * @static
         * @param {pairing.PairingConfiguration.$Properties} message PairingConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingConfiguration.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.encoding != null && $Object.hasOwnProperty.call(message, "encoding"))
                $root.pairing.PairingEncoding.encode(message.encoding, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.clientRole != null && $Object.hasOwnProperty.call(message, "clientRole") && message.clientRole !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.clientRole);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PairingConfiguration message, length delimited. Does not implicitly {@link pairing.PairingConfiguration.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pairing.PairingConfiguration
         * @static
         * @param {pairing.PairingConfiguration.$Properties} message PairingConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingConfiguration.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PairingConfiguration message from the specified reader or buffer.
         * @function decode
         * @memberof pairing.PairingConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pairing.PairingConfiguration & pairing.PairingConfiguration.$Shape} PairingConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingConfiguration.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.pairing.PairingConfiguration(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.encoding = $root.pairing.PairingEncoding.decode(reader, reader.uint32(), $undefined, _depth + 1, message.encoding);
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.clientRole = value;
                        else
                            delete message.clientRole;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PairingConfiguration message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pairing.PairingConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pairing.PairingConfiguration & pairing.PairingConfiguration.$Shape} PairingConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingConfiguration.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PairingConfiguration message.
         * @function verify
         * @memberof pairing.PairingConfiguration
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PairingConfiguration.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.encoding != null && $Object.hasOwnProperty.call(message, "encoding")) {
                var error = $root.pairing.PairingEncoding.verify(message.encoding, _depth + 1);
                if (error)
                    return "encoding." + error;
            }
            if (message.clientRole != null && $Object.hasOwnProperty.call(message, "clientRole"))
                if (typeof message.clientRole !== "number" || (message.clientRole | 0) !== message.clientRole)
                    return "clientRole: enum value expected";
            return null;
        };

        /**
         * Creates a PairingConfiguration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pairing.PairingConfiguration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pairing.PairingConfiguration} PairingConfiguration
         */
        PairingConfiguration.fromObject = function (object, _depth) {
            if (object instanceof $root.pairing.PairingConfiguration)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".pairing.PairingConfiguration: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.pairing.PairingConfiguration();
            if (object.encoding != null) {
                if (!$util.isObject(object.encoding))
                    throw $TypeError(".pairing.PairingConfiguration.encoding: object expected");
                message.encoding = $root.pairing.PairingEncoding.fromObject(object.encoding, _depth + 1);
            }
            if (object.clientRole !== 0 && (typeof object.clientRole !== "string" || $root.pairing.RoleType[object.clientRole] !== 0))
                switch (object.clientRole) {
                case "ROLE_TYPE_UNKNOWN":
                case 0:
                    message.clientRole = 0;
                    break;
                case "ROLE_TYPE_INPUT":
                case 1:
                    message.clientRole = 1;
                    break;
                case "ROLE_TYPE_OUTPUT":
                case 2:
                    message.clientRole = 2;
                    break;
                default:
                    if (typeof object.clientRole === "number" && (object.clientRole | 0) === object.clientRole)
                        message.clientRole = object.clientRole;
                }
            return message;
        };

        /**
         * Creates a plain object from a PairingConfiguration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pairing.PairingConfiguration
         * @static
         * @param {pairing.PairingConfiguration} message PairingConfiguration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PairingConfiguration.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.encoding = null;
                object.clientRole = options.enums === $String ? "ROLE_TYPE_UNKNOWN" : 0;
            }
            if (message.encoding != null && $Object.hasOwnProperty.call(message, "encoding"))
                object.encoding = $root.pairing.PairingEncoding.toObject(message.encoding, options, _depth + 1);
            if (message.clientRole != null && $Object.hasOwnProperty.call(message, "clientRole"))
                object.clientRole = options.enums === $String ? $root.pairing.RoleType[message.clientRole] === $undefined ? message.clientRole : $root.pairing.RoleType[message.clientRole] : message.clientRole;
            return object;
        };

        /**
         * Converts this PairingConfiguration to JSON.
         * @function toJSON
         * @memberof pairing.PairingConfiguration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PairingConfiguration.prototype.toJSON = function() {
            return PairingConfiguration.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PairingConfiguration
         * @function getTypeUrl
         * @memberof pairing.PairingConfiguration
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PairingConfiguration.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/pairing.PairingConfiguration";
        };

        return PairingConfiguration;
    })();

    pairing.PairingConfigurationAck = (function() {

        /**
         * Properties of a PairingConfigurationAck.
         * @typedef {Object} pairing.PairingConfigurationAck.$Properties
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PairingConfigurationAck.
         * @memberof pairing
         * @interface IPairingConfigurationAck
         * @augments pairing.PairingConfigurationAck.$Properties
         * @deprecated Use pairing.PairingConfigurationAck.$Properties instead.
         */

        /**
         * Shape of a PairingConfigurationAck.
         * @typedef {pairing.PairingConfigurationAck.$Properties} pairing.PairingConfigurationAck.$Shape
         */

        /**
         * Constructs a new PairingConfigurationAck.
         * @memberof pairing
         * @classdesc Represents a PairingConfigurationAck.
         * @constructor
         * @param {pairing.PairingConfigurationAck.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PairingConfigurationAck = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Creates a new PairingConfigurationAck instance using the specified properties.
         * @function create
         * @memberof pairing.PairingConfigurationAck
         * @static
         * @param {pairing.PairingConfigurationAck.$Properties=} [properties] Properties to set
         * @returns {pairing.PairingConfigurationAck} PairingConfigurationAck instance
         * @type {{
         *   (properties: pairing.PairingConfigurationAck.$Shape): pairing.PairingConfigurationAck & pairing.PairingConfigurationAck.$Shape;
         *   (properties?: pairing.PairingConfigurationAck.$Properties): pairing.PairingConfigurationAck;
         * }}
         */
        PairingConfigurationAck.create = function(properties) {
            return new PairingConfigurationAck(properties);
        };

        /**
         * Encodes the specified PairingConfigurationAck message. Does not implicitly {@link pairing.PairingConfigurationAck.verify|verify} messages.
         * @function encode
         * @memberof pairing.PairingConfigurationAck
         * @static
         * @param {pairing.PairingConfigurationAck.$Properties} message PairingConfigurationAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingConfigurationAck.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PairingConfigurationAck message, length delimited. Does not implicitly {@link pairing.PairingConfigurationAck.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pairing.PairingConfigurationAck
         * @static
         * @param {pairing.PairingConfigurationAck.$Properties} message PairingConfigurationAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingConfigurationAck.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PairingConfigurationAck message from the specified reader or buffer.
         * @function decode
         * @memberof pairing.PairingConfigurationAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pairing.PairingConfigurationAck & pairing.PairingConfigurationAck.$Shape} PairingConfigurationAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingConfigurationAck.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.pairing.PairingConfigurationAck();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                reader.skipType(tag & 7, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PairingConfigurationAck message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pairing.PairingConfigurationAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pairing.PairingConfigurationAck & pairing.PairingConfigurationAck.$Shape} PairingConfigurationAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingConfigurationAck.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PairingConfigurationAck message.
         * @function verify
         * @memberof pairing.PairingConfigurationAck
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PairingConfigurationAck.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            return null;
        };

        /**
         * Creates a PairingConfigurationAck message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pairing.PairingConfigurationAck
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pairing.PairingConfigurationAck} PairingConfigurationAck
         */
        PairingConfigurationAck.fromObject = function (object, _depth) {
            if (object instanceof $root.pairing.PairingConfigurationAck)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".pairing.PairingConfigurationAck: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            return new $root.pairing.PairingConfigurationAck();
        };

        /**
         * Creates a plain object from a PairingConfigurationAck message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pairing.PairingConfigurationAck
         * @static
         * @param {pairing.PairingConfigurationAck} message PairingConfigurationAck
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PairingConfigurationAck.toObject = function () {
            return {};
        };

        /**
         * Converts this PairingConfigurationAck to JSON.
         * @function toJSON
         * @memberof pairing.PairingConfigurationAck
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PairingConfigurationAck.prototype.toJSON = function() {
            return PairingConfigurationAck.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PairingConfigurationAck
         * @function getTypeUrl
         * @memberof pairing.PairingConfigurationAck
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PairingConfigurationAck.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/pairing.PairingConfigurationAck";
        };

        return PairingConfigurationAck;
    })();

    pairing.PairingSecret = (function() {

        /**
         * Properties of a PairingSecret.
         * @typedef {Object} pairing.PairingSecret.$Properties
         * @property {Uint8Array|null} [secret] PairingSecret secret
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PairingSecret.
         * @memberof pairing
         * @interface IPairingSecret
         * @augments pairing.PairingSecret.$Properties
         * @deprecated Use pairing.PairingSecret.$Properties instead.
         */

        /**
         * Shape of a PairingSecret.
         * @typedef {pairing.PairingSecret.$Properties} pairing.PairingSecret.$Shape
         */

        /**
         * Constructs a new PairingSecret.
         * @memberof pairing
         * @classdesc Represents a PairingSecret.
         * @constructor
         * @param {pairing.PairingSecret.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PairingSecret = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * PairingSecret secret.
         * @member {Uint8Array} secret
         * @memberof pairing.PairingSecret
         * @instance
         */
        PairingSecret.prototype.secret = $util.newBuffer([]);

        /**
         * Creates a new PairingSecret instance using the specified properties.
         * @function create
         * @memberof pairing.PairingSecret
         * @static
         * @param {pairing.PairingSecret.$Properties=} [properties] Properties to set
         * @returns {pairing.PairingSecret} PairingSecret instance
         * @type {{
         *   (properties: pairing.PairingSecret.$Shape): pairing.PairingSecret & pairing.PairingSecret.$Shape;
         *   (properties?: pairing.PairingSecret.$Properties): pairing.PairingSecret;
         * }}
         */
        PairingSecret.create = function(properties) {
            return new PairingSecret(properties);
        };

        /**
         * Encodes the specified PairingSecret message. Does not implicitly {@link pairing.PairingSecret.verify|verify} messages.
         * @function encode
         * @memberof pairing.PairingSecret
         * @static
         * @param {pairing.PairingSecret.$Properties} message PairingSecret message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingSecret.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.secret != null && $Object.hasOwnProperty.call(message, "secret") && message.secret.length)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.secret);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PairingSecret message, length delimited. Does not implicitly {@link pairing.PairingSecret.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pairing.PairingSecret
         * @static
         * @param {pairing.PairingSecret.$Properties} message PairingSecret message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingSecret.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PairingSecret message from the specified reader or buffer.
         * @function decode
         * @memberof pairing.PairingSecret
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pairing.PairingSecret & pairing.PairingSecret.$Shape} PairingSecret
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingSecret.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.pairing.PairingSecret(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.secret = value;
                        else
                            delete message.secret;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PairingSecret message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pairing.PairingSecret
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pairing.PairingSecret & pairing.PairingSecret.$Shape} PairingSecret
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingSecret.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PairingSecret message.
         * @function verify
         * @memberof pairing.PairingSecret
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PairingSecret.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.secret != null && $Object.hasOwnProperty.call(message, "secret"))
                if (!(message.secret && typeof message.secret.length === "number" || $util.isString(message.secret)))
                    return "secret: buffer expected";
            return null;
        };

        /**
         * Creates a PairingSecret message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pairing.PairingSecret
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pairing.PairingSecret} PairingSecret
         */
        PairingSecret.fromObject = function (object, _depth) {
            if (object instanceof $root.pairing.PairingSecret)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".pairing.PairingSecret: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.pairing.PairingSecret();
            if (object.secret != null)
                if (object.secret.length)
                    if (typeof object.secret === "string")
                        $util.base64.decode(object.secret, message.secret = $util.newBuffer($util.base64.length(object.secret)), 0);
                    else if (object.secret.length >= 0)
                        message.secret = object.secret;
            return message;
        };

        /**
         * Creates a plain object from a PairingSecret message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pairing.PairingSecret
         * @static
         * @param {pairing.PairingSecret} message PairingSecret
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PairingSecret.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults)
                if (options.bytes === $String)
                    object.secret = "";
                else {
                    object.secret = [];
                    if (options.bytes !== $Array)
                        object.secret = $util.newBuffer(object.secret);
                }
            if (message.secret != null && $Object.hasOwnProperty.call(message, "secret"))
                object.secret = options.bytes === $String ? $util.base64.encode(message.secret, 0, message.secret.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.secret) : message.secret;
            return object;
        };

        /**
         * Converts this PairingSecret to JSON.
         * @function toJSON
         * @memberof pairing.PairingSecret
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PairingSecret.prototype.toJSON = function() {
            return PairingSecret.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PairingSecret
         * @function getTypeUrl
         * @memberof pairing.PairingSecret
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PairingSecret.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/pairing.PairingSecret";
        };

        return PairingSecret;
    })();

    pairing.PairingSecretAck = (function() {

        /**
         * Properties of a PairingSecretAck.
         * @typedef {Object} pairing.PairingSecretAck.$Properties
         * @property {Uint8Array|null} [secret] PairingSecretAck secret
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PairingSecretAck.
         * @memberof pairing
         * @interface IPairingSecretAck
         * @augments pairing.PairingSecretAck.$Properties
         * @deprecated Use pairing.PairingSecretAck.$Properties instead.
         */

        /**
         * Shape of a PairingSecretAck.
         * @typedef {pairing.PairingSecretAck.$Properties} pairing.PairingSecretAck.$Shape
         */

        /**
         * Constructs a new PairingSecretAck.
         * @memberof pairing
         * @classdesc Represents a PairingSecretAck.
         * @constructor
         * @param {pairing.PairingSecretAck.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PairingSecretAck = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * PairingSecretAck secret.
         * @member {Uint8Array} secret
         * @memberof pairing.PairingSecretAck
         * @instance
         */
        PairingSecretAck.prototype.secret = $util.newBuffer([]);

        /**
         * Creates a new PairingSecretAck instance using the specified properties.
         * @function create
         * @memberof pairing.PairingSecretAck
         * @static
         * @param {pairing.PairingSecretAck.$Properties=} [properties] Properties to set
         * @returns {pairing.PairingSecretAck} PairingSecretAck instance
         * @type {{
         *   (properties: pairing.PairingSecretAck.$Shape): pairing.PairingSecretAck & pairing.PairingSecretAck.$Shape;
         *   (properties?: pairing.PairingSecretAck.$Properties): pairing.PairingSecretAck;
         * }}
         */
        PairingSecretAck.create = function(properties) {
            return new PairingSecretAck(properties);
        };

        /**
         * Encodes the specified PairingSecretAck message. Does not implicitly {@link pairing.PairingSecretAck.verify|verify} messages.
         * @function encode
         * @memberof pairing.PairingSecretAck
         * @static
         * @param {pairing.PairingSecretAck.$Properties} message PairingSecretAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingSecretAck.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.secret != null && $Object.hasOwnProperty.call(message, "secret") && message.secret.length)
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.secret);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PairingSecretAck message, length delimited. Does not implicitly {@link pairing.PairingSecretAck.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pairing.PairingSecretAck
         * @static
         * @param {pairing.PairingSecretAck.$Properties} message PairingSecretAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingSecretAck.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PairingSecretAck message from the specified reader or buffer.
         * @function decode
         * @memberof pairing.PairingSecretAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pairing.PairingSecretAck & pairing.PairingSecretAck.$Shape} PairingSecretAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingSecretAck.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.pairing.PairingSecretAck(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.bytes()).length)
                            message.secret = value;
                        else
                            delete message.secret;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PairingSecretAck message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pairing.PairingSecretAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pairing.PairingSecretAck & pairing.PairingSecretAck.$Shape} PairingSecretAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingSecretAck.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PairingSecretAck message.
         * @function verify
         * @memberof pairing.PairingSecretAck
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PairingSecretAck.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.secret != null && $Object.hasOwnProperty.call(message, "secret"))
                if (!(message.secret && typeof message.secret.length === "number" || $util.isString(message.secret)))
                    return "secret: buffer expected";
            return null;
        };

        /**
         * Creates a PairingSecretAck message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pairing.PairingSecretAck
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pairing.PairingSecretAck} PairingSecretAck
         */
        PairingSecretAck.fromObject = function (object, _depth) {
            if (object instanceof $root.pairing.PairingSecretAck)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".pairing.PairingSecretAck: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.pairing.PairingSecretAck();
            if (object.secret != null)
                if (object.secret.length)
                    if (typeof object.secret === "string")
                        $util.base64.decode(object.secret, message.secret = $util.newBuffer($util.base64.length(object.secret)), 0);
                    else if (object.secret.length >= 0)
                        message.secret = object.secret;
            return message;
        };

        /**
         * Creates a plain object from a PairingSecretAck message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pairing.PairingSecretAck
         * @static
         * @param {pairing.PairingSecretAck} message PairingSecretAck
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PairingSecretAck.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults)
                if (options.bytes === $String)
                    object.secret = "";
                else {
                    object.secret = [];
                    if (options.bytes !== $Array)
                        object.secret = $util.newBuffer(object.secret);
                }
            if (message.secret != null && $Object.hasOwnProperty.call(message, "secret"))
                object.secret = options.bytes === $String ? $util.base64.encode(message.secret, 0, message.secret.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.secret) : message.secret;
            return object;
        };

        /**
         * Converts this PairingSecretAck to JSON.
         * @function toJSON
         * @memberof pairing.PairingSecretAck
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PairingSecretAck.prototype.toJSON = function() {
            return PairingSecretAck.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PairingSecretAck
         * @function getTypeUrl
         * @memberof pairing.PairingSecretAck
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PairingSecretAck.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/pairing.PairingSecretAck";
        };

        return PairingSecretAck;
    })();

    pairing.PairingMessage = (function() {

        /**
         * Properties of a PairingMessage.
         * @typedef {Object} pairing.PairingMessage.$Properties
         * @property {number|null} [protocolVersion] PairingMessage protocolVersion
         * @property {pairing.Status|null} [status] PairingMessage status
         * @property {pairing.PairingRequest.$Properties|null} [pairingRequest] PairingMessage pairingRequest
         * @property {pairing.PairingRequestAck.$Properties|null} [pairingRequestAck] PairingMessage pairingRequestAck
         * @property {pairing.PairingOption.$Properties|null} [pairingOption] PairingMessage pairingOption
         * @property {pairing.PairingConfiguration.$Properties|null} [pairingConfiguration] PairingMessage pairingConfiguration
         * @property {pairing.PairingConfigurationAck.$Properties|null} [pairingConfigurationAck] PairingMessage pairingConfigurationAck
         * @property {pairing.PairingSecret.$Properties|null} [pairingSecret] PairingMessage pairingSecret
         * @property {pairing.PairingSecretAck.$Properties|null} [pairingSecretAck] PairingMessage pairingSecretAck
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PairingMessage.
         * @memberof pairing
         * @interface IPairingMessage
         * @augments pairing.PairingMessage.$Properties
         * @deprecated Use pairing.PairingMessage.$Properties instead.
         */

        /**
         * Shape of a PairingMessage.
         * @typedef {pairing.PairingMessage.$Properties} pairing.PairingMessage.$Shape
         */

        /**
         * Constructs a new PairingMessage.
         * @memberof pairing
         * @classdesc Represents a PairingMessage.
         * @constructor
         * @param {pairing.PairingMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PairingMessage = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * PairingMessage protocolVersion.
         * @member {number} protocolVersion
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.protocolVersion = 0;

        /**
         * PairingMessage status.
         * @member {pairing.Status} status
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.status = 200;

        /**
         * PairingMessage pairingRequest.
         * @member {pairing.PairingRequest.$Properties|null|undefined} pairingRequest
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.pairingRequest = null;

        /**
         * PairingMessage pairingRequestAck.
         * @member {pairing.PairingRequestAck.$Properties|null|undefined} pairingRequestAck
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.pairingRequestAck = null;

        /**
         * PairingMessage pairingOption.
         * @member {pairing.PairingOption.$Properties|null|undefined} pairingOption
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.pairingOption = null;

        /**
         * PairingMessage pairingConfiguration.
         * @member {pairing.PairingConfiguration.$Properties|null|undefined} pairingConfiguration
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.pairingConfiguration = null;

        /**
         * PairingMessage pairingConfigurationAck.
         * @member {pairing.PairingConfigurationAck.$Properties|null|undefined} pairingConfigurationAck
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.pairingConfigurationAck = null;

        /**
         * PairingMessage pairingSecret.
         * @member {pairing.PairingSecret.$Properties|null|undefined} pairingSecret
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.pairingSecret = null;

        /**
         * PairingMessage pairingSecretAck.
         * @member {pairing.PairingSecretAck.$Properties|null|undefined} pairingSecretAck
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.pairingSecretAck = null;

        /**
         * Creates a new PairingMessage instance using the specified properties.
         * @function create
         * @memberof pairing.PairingMessage
         * @static
         * @param {pairing.PairingMessage.$Properties=} [properties] Properties to set
         * @returns {pairing.PairingMessage} PairingMessage instance
         * @type {{
         *   (properties: pairing.PairingMessage.$Shape): pairing.PairingMessage & pairing.PairingMessage.$Shape;
         *   (properties?: pairing.PairingMessage.$Properties): pairing.PairingMessage;
         * }}
         */
        PairingMessage.create = function(properties) {
            return new PairingMessage(properties);
        };

        /**
         * Encodes the specified PairingMessage message. Does not implicitly {@link pairing.PairingMessage.verify|verify} messages.
         * @function encode
         * @memberof pairing.PairingMessage
         * @static
         * @param {pairing.PairingMessage.$Properties} message PairingMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.protocolVersion != null && $Object.hasOwnProperty.call(message, "protocolVersion") && message.protocolVersion !== 0)
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.protocolVersion);
            if (message.status != null && $Object.hasOwnProperty.call(message, "status") && message.status !== 200)
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.pairingRequest != null && $Object.hasOwnProperty.call(message, "pairingRequest"))
                $root.pairing.PairingRequest.encode(message.pairingRequest, writer.uint32(/* id 101, wireType 2 =*/810).fork(), _depth + 1).ldelim();
            if (message.pairingRequestAck != null && $Object.hasOwnProperty.call(message, "pairingRequestAck"))
                $root.pairing.PairingRequestAck.encode(message.pairingRequestAck, writer.uint32(/* id 102, wireType 2 =*/818).fork(), _depth + 1).ldelim();
            if (message.pairingOption != null && $Object.hasOwnProperty.call(message, "pairingOption"))
                $root.pairing.PairingOption.encode(message.pairingOption, writer.uint32(/* id 201, wireType 2 =*/1610).fork(), _depth + 1).ldelim();
            if (message.pairingConfiguration != null && $Object.hasOwnProperty.call(message, "pairingConfiguration"))
                $root.pairing.PairingConfiguration.encode(message.pairingConfiguration, writer.uint32(/* id 301, wireType 2 =*/2410).fork(), _depth + 1).ldelim();
            if (message.pairingConfigurationAck != null && $Object.hasOwnProperty.call(message, "pairingConfigurationAck"))
                $root.pairing.PairingConfigurationAck.encode(message.pairingConfigurationAck, writer.uint32(/* id 302, wireType 2 =*/2418).fork(), _depth + 1).ldelim();
            if (message.pairingSecret != null && $Object.hasOwnProperty.call(message, "pairingSecret"))
                $root.pairing.PairingSecret.encode(message.pairingSecret, writer.uint32(/* id 401, wireType 2 =*/3210).fork(), _depth + 1).ldelim();
            if (message.pairingSecretAck != null && $Object.hasOwnProperty.call(message, "pairingSecretAck"))
                $root.pairing.PairingSecretAck.encode(message.pairingSecretAck, writer.uint32(/* id 402, wireType 2 =*/3218).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PairingMessage message, length delimited. Does not implicitly {@link pairing.PairingMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pairing.PairingMessage
         * @static
         * @param {pairing.PairingMessage.$Properties} message PairingMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PairingMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PairingMessage message from the specified reader or buffer.
         * @function decode
         * @memberof pairing.PairingMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pairing.PairingMessage & pairing.PairingMessage.$Shape} PairingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.pairing.PairingMessage(), value;
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.protocolVersion = value;
                        else
                            delete message.protocolVersion;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if ((value = reader.int32()) !== 200)
                            message.status = value;
                        else
                            delete message.status;
                        continue;
                    }
                case 101: {
                        if (wireType !== 2)
                            break;
                        message.pairingRequest = $root.pairing.PairingRequest.decode(reader, reader.uint32(), $undefined, _depth + 1, message.pairingRequest);
                        continue;
                    }
                case 102: {
                        if (wireType !== 2)
                            break;
                        message.pairingRequestAck = $root.pairing.PairingRequestAck.decode(reader, reader.uint32(), $undefined, _depth + 1, message.pairingRequestAck);
                        continue;
                    }
                case 201: {
                        if (wireType !== 2)
                            break;
                        message.pairingOption = $root.pairing.PairingOption.decode(reader, reader.uint32(), $undefined, _depth + 1, message.pairingOption);
                        continue;
                    }
                case 301: {
                        if (wireType !== 2)
                            break;
                        message.pairingConfiguration = $root.pairing.PairingConfiguration.decode(reader, reader.uint32(), $undefined, _depth + 1, message.pairingConfiguration);
                        continue;
                    }
                case 302: {
                        if (wireType !== 2)
                            break;
                        message.pairingConfigurationAck = $root.pairing.PairingConfigurationAck.decode(reader, reader.uint32(), $undefined, _depth + 1, message.pairingConfigurationAck);
                        continue;
                    }
                case 401: {
                        if (wireType !== 2)
                            break;
                        message.pairingSecret = $root.pairing.PairingSecret.decode(reader, reader.uint32(), $undefined, _depth + 1, message.pairingSecret);
                        continue;
                    }
                case 402: {
                        if (wireType !== 2)
                            break;
                        message.pairingSecretAck = $root.pairing.PairingSecretAck.decode(reader, reader.uint32(), $undefined, _depth + 1, message.pairingSecretAck);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PairingMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pairing.PairingMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pairing.PairingMessage & pairing.PairingMessage.$Shape} PairingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PairingMessage.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PairingMessage message.
         * @function verify
         * @memberof pairing.PairingMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PairingMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.protocolVersion != null && $Object.hasOwnProperty.call(message, "protocolVersion"))
                if (!$util.isInteger(message.protocolVersion))
                    return "protocolVersion: integer expected";
            if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
                if (typeof message.status !== "number" || (message.status | 0) !== message.status)
                    return "status: enum value expected";
            if (message.pairingRequest != null && $Object.hasOwnProperty.call(message, "pairingRequest")) {
                var error = $root.pairing.PairingRequest.verify(message.pairingRequest, _depth + 1);
                if (error)
                    return "pairingRequest." + error;
            }
            if (message.pairingRequestAck != null && $Object.hasOwnProperty.call(message, "pairingRequestAck")) {
                var error = $root.pairing.PairingRequestAck.verify(message.pairingRequestAck, _depth + 1);
                if (error)
                    return "pairingRequestAck." + error;
            }
            if (message.pairingOption != null && $Object.hasOwnProperty.call(message, "pairingOption")) {
                var error = $root.pairing.PairingOption.verify(message.pairingOption, _depth + 1);
                if (error)
                    return "pairingOption." + error;
            }
            if (message.pairingConfiguration != null && $Object.hasOwnProperty.call(message, "pairingConfiguration")) {
                var error = $root.pairing.PairingConfiguration.verify(message.pairingConfiguration, _depth + 1);
                if (error)
                    return "pairingConfiguration." + error;
            }
            if (message.pairingConfigurationAck != null && $Object.hasOwnProperty.call(message, "pairingConfigurationAck")) {
                var error = $root.pairing.PairingConfigurationAck.verify(message.pairingConfigurationAck, _depth + 1);
                if (error)
                    return "pairingConfigurationAck." + error;
            }
            if (message.pairingSecret != null && $Object.hasOwnProperty.call(message, "pairingSecret")) {
                var error = $root.pairing.PairingSecret.verify(message.pairingSecret, _depth + 1);
                if (error)
                    return "pairingSecret." + error;
            }
            if (message.pairingSecretAck != null && $Object.hasOwnProperty.call(message, "pairingSecretAck")) {
                var error = $root.pairing.PairingSecretAck.verify(message.pairingSecretAck, _depth + 1);
                if (error)
                    return "pairingSecretAck." + error;
            }
            return null;
        };

        /**
         * Creates a PairingMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pairing.PairingMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pairing.PairingMessage} PairingMessage
         */
        PairingMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.pairing.PairingMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".pairing.PairingMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.pairing.PairingMessage();
            if (object.protocolVersion != null)
                if ($Number(object.protocolVersion) !== 0)
                    message.protocolVersion = object.protocolVersion >>> 0;
            if (object.status !== 200 && (typeof object.status !== "string" || $root.pairing.Status[object.status] !== 200))
                switch (object.status) {
                case "STATUS_OK":
                case 200:
                    message.status = 200;
                    break;
                case "STATUS_ERROR":
                case 400:
                    message.status = 400;
                    break;
                case "STATUS_BAD_CONFIGURATION":
                case 401:
                    message.status = 401;
                    break;
                default:
                    if (typeof object.status === "number" && (object.status | 0) === object.status)
                        message.status = object.status;
                }
            if (object.pairingRequest != null) {
                if (!$util.isObject(object.pairingRequest))
                    throw $TypeError(".pairing.PairingMessage.pairingRequest: object expected");
                message.pairingRequest = $root.pairing.PairingRequest.fromObject(object.pairingRequest, _depth + 1);
            }
            if (object.pairingRequestAck != null) {
                if (!$util.isObject(object.pairingRequestAck))
                    throw $TypeError(".pairing.PairingMessage.pairingRequestAck: object expected");
                message.pairingRequestAck = $root.pairing.PairingRequestAck.fromObject(object.pairingRequestAck, _depth + 1);
            }
            if (object.pairingOption != null) {
                if (!$util.isObject(object.pairingOption))
                    throw $TypeError(".pairing.PairingMessage.pairingOption: object expected");
                message.pairingOption = $root.pairing.PairingOption.fromObject(object.pairingOption, _depth + 1);
            }
            if (object.pairingConfiguration != null) {
                if (!$util.isObject(object.pairingConfiguration))
                    throw $TypeError(".pairing.PairingMessage.pairingConfiguration: object expected");
                message.pairingConfiguration = $root.pairing.PairingConfiguration.fromObject(object.pairingConfiguration, _depth + 1);
            }
            if (object.pairingConfigurationAck != null) {
                if (!$util.isObject(object.pairingConfigurationAck))
                    throw $TypeError(".pairing.PairingMessage.pairingConfigurationAck: object expected");
                message.pairingConfigurationAck = $root.pairing.PairingConfigurationAck.fromObject(object.pairingConfigurationAck, _depth + 1);
            }
            if (object.pairingSecret != null) {
                if (!$util.isObject(object.pairingSecret))
                    throw $TypeError(".pairing.PairingMessage.pairingSecret: object expected");
                message.pairingSecret = $root.pairing.PairingSecret.fromObject(object.pairingSecret, _depth + 1);
            }
            if (object.pairingSecretAck != null) {
                if (!$util.isObject(object.pairingSecretAck))
                    throw $TypeError(".pairing.PairingMessage.pairingSecretAck: object expected");
                message.pairingSecretAck = $root.pairing.PairingSecretAck.fromObject(object.pairingSecretAck, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PairingMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pairing.PairingMessage
         * @static
         * @param {pairing.PairingMessage} message PairingMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PairingMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.protocolVersion = 0;
                object.status = options.enums === $String ? "STATUS_OK" : 200;
                object.pairingRequest = null;
                object.pairingRequestAck = null;
                object.pairingOption = null;
                object.pairingConfiguration = null;
                object.pairingConfigurationAck = null;
                object.pairingSecret = null;
                object.pairingSecretAck = null;
            }
            if (message.protocolVersion != null && $Object.hasOwnProperty.call(message, "protocolVersion"))
                object.protocolVersion = message.protocolVersion;
            if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === $String ? $root.pairing.Status[message.status] === $undefined ? message.status : $root.pairing.Status[message.status] : message.status;
            if (message.pairingRequest != null && $Object.hasOwnProperty.call(message, "pairingRequest"))
                object.pairingRequest = $root.pairing.PairingRequest.toObject(message.pairingRequest, options, _depth + 1);
            if (message.pairingRequestAck != null && $Object.hasOwnProperty.call(message, "pairingRequestAck"))
                object.pairingRequestAck = $root.pairing.PairingRequestAck.toObject(message.pairingRequestAck, options, _depth + 1);
            if (message.pairingOption != null && $Object.hasOwnProperty.call(message, "pairingOption"))
                object.pairingOption = $root.pairing.PairingOption.toObject(message.pairingOption, options, _depth + 1);
            if (message.pairingConfiguration != null && $Object.hasOwnProperty.call(message, "pairingConfiguration"))
                object.pairingConfiguration = $root.pairing.PairingConfiguration.toObject(message.pairingConfiguration, options, _depth + 1);
            if (message.pairingConfigurationAck != null && $Object.hasOwnProperty.call(message, "pairingConfigurationAck"))
                object.pairingConfigurationAck = $root.pairing.PairingConfigurationAck.toObject(message.pairingConfigurationAck, options, _depth + 1);
            if (message.pairingSecret != null && $Object.hasOwnProperty.call(message, "pairingSecret"))
                object.pairingSecret = $root.pairing.PairingSecret.toObject(message.pairingSecret, options, _depth + 1);
            if (message.pairingSecretAck != null && $Object.hasOwnProperty.call(message, "pairingSecretAck"))
                object.pairingSecretAck = $root.pairing.PairingSecretAck.toObject(message.pairingSecretAck, options, _depth + 1);
            return object;
        };

        /**
         * Converts this PairingMessage to JSON.
         * @function toJSON
         * @memberof pairing.PairingMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PairingMessage.prototype.toJSON = function() {
            return PairingMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PairingMessage
         * @function getTypeUrl
         * @memberof pairing.PairingMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PairingMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/pairing.PairingMessage";
        };

        return PairingMessage;
    })();

    return pairing;
})();

module.exports = $root;
