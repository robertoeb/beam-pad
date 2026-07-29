/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
var $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $TypeError = $util.global.TypeError, $String = $util.global.String, $Number = $util.global.Number, $Array = $util.global.Array;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.remotemessage = (function() {

    /**
     * Namespace remotemessage.
     * @exports remotemessage
     * @namespace
     */
    var remotemessage = {};

    return remotemessage;
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
         * @property {pairing.Status|null} [status] PairingMessage status
         * @property {number|null} [protocolVersion] PairingMessage protocolVersion
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
         * PairingMessage status.
         * @member {pairing.Status} status
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.status = 200;

        /**
         * PairingMessage protocolVersion.
         * @member {number} protocolVersion
         * @memberof pairing.PairingMessage
         * @instance
         */
        PairingMessage.prototype.protocolVersion = 0;

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
            if (message.status != null && $Object.hasOwnProperty.call(message, "status") && message.status !== 200)
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
            if (message.protocolVersion != null && $Object.hasOwnProperty.call(message, "protocolVersion") && message.protocolVersion !== 0)
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.protocolVersion);
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
                        if ((value = reader.int32()) !== 200)
                            message.status = value;
                        else
                            delete message.status;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.protocolVersion = value;
                        else
                            delete message.protocolVersion;
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
            if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
                if (typeof message.status !== "number" || (message.status | 0) !== message.status)
                    return "status: enum value expected";
            if (message.protocolVersion != null && $Object.hasOwnProperty.call(message, "protocolVersion"))
                if (!$util.isInteger(message.protocolVersion))
                    return "protocolVersion: integer expected";
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
            if (object.protocolVersion != null)
                if ($Number(object.protocolVersion) !== 0)
                    message.protocolVersion = object.protocolVersion >>> 0;
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
                object.status = options.enums === $String ? "STATUS_OK" : 200;
                object.protocolVersion = 0;
                object.pairingRequest = null;
                object.pairingRequestAck = null;
                object.pairingOption = null;
                object.pairingConfiguration = null;
                object.pairingConfigurationAck = null;
                object.pairingSecret = null;
                object.pairingSecretAck = null;
            }
            if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === $String ? $root.pairing.Status[message.status] === $undefined ? message.status : $root.pairing.Status[message.status] : message.status;
            if (message.protocolVersion != null && $Object.hasOwnProperty.call(message, "protocolVersion"))
                object.protocolVersion = message.protocolVersion;
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
