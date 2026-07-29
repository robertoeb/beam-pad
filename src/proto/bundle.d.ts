import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace pairing. */
export namespace pairing {

    /** Status enum. */
    enum Status {

        /** STATUS_OK value */
        STATUS_OK = 200,

        /** STATUS_ERROR value */
        STATUS_ERROR = 400,

        /** STATUS_BAD_CONFIGURATION value */
        STATUS_BAD_CONFIGURATION = 401
    }

    /** RoleType enum. */
    enum RoleType {

        /** ROLE_TYPE_UNKNOWN value */
        ROLE_TYPE_UNKNOWN = 0,

        /** ROLE_TYPE_INPUT value */
        ROLE_TYPE_INPUT = 1,

        /** ROLE_TYPE_OUTPUT value */
        ROLE_TYPE_OUTPUT = 2
    }

    /** EncodingType enum. */
    enum EncodingType {

        /** ENCODING_TYPE_UNKNOWN value */
        ENCODING_TYPE_UNKNOWN = 0,

        /** ENCODING_TYPE_ALPHANUMERIC value */
        ENCODING_TYPE_ALPHANUMERIC = 1,

        /** ENCODING_TYPE_NUMERIC value */
        ENCODING_TYPE_NUMERIC = 2,

        /** ENCODING_TYPE_HEXADECIMAL value */
        ENCODING_TYPE_HEXADECIMAL = 3,

        /** ENCODING_TYPE_QRCODE value */
        ENCODING_TYPE_QRCODE = 4
    }

    /**
     * Properties of a PairingRequest.
     * @deprecated Use pairing.PairingRequest.$Properties instead.
     */
    interface IPairingRequest extends pairing.PairingRequest.$Properties {
    }

    /** Represents a PairingRequest. */
    class PairingRequest {

        /**
         * Constructs a new PairingRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: pairing.PairingRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PairingRequest serviceName. */
        serviceName: string;

        /** PairingRequest clientName. */
        clientName: string;

        /**
         * Creates a new PairingRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingRequest instance
         */
        static create(properties: pairing.PairingRequest.$Shape): pairing.PairingRequest & pairing.PairingRequest.$Shape;
        static create(properties?: pairing.PairingRequest.$Properties): pairing.PairingRequest;

        /**
         * Encodes the specified PairingRequest message. Does not implicitly {@link pairing.PairingRequest.verify|verify} messages.
         * @param message PairingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: pairing.PairingRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingRequest message, length delimited. Does not implicitly {@link pairing.PairingRequest.verify|verify} messages.
         * @param message PairingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: pairing.PairingRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {pairing.PairingRequest & pairing.PairingRequest.$Shape} PairingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pairing.PairingRequest & pairing.PairingRequest.$Shape;

        /**
         * Decodes a PairingRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {pairing.PairingRequest & pairing.PairingRequest.$Shape} PairingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pairing.PairingRequest & pairing.PairingRequest.$Shape;

        /**
         * Verifies a PairingRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingRequest
         */
        static fromObject(object: { [k: string]: any }): pairing.PairingRequest;

        /**
         * Creates a plain object from a PairingRequest message. Also converts values to other types if specified.
         * @param message PairingRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: pairing.PairingRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PairingRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingRequest {

        /** Properties of a PairingRequest. */
        interface $Properties {

            /** PairingRequest serviceName */
            serviceName?: (string|null);

            /** PairingRequest clientName */
            clientName?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PairingRequest. */
        type $Shape = pairing.PairingRequest.$Properties;
    }

    /**
     * Properties of a PairingRequestAck.
     * @deprecated Use pairing.PairingRequestAck.$Properties instead.
     */
    interface IPairingRequestAck extends pairing.PairingRequestAck.$Properties {
    }

    /** Represents a PairingRequestAck. */
    class PairingRequestAck {

        /**
         * Constructs a new PairingRequestAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: pairing.PairingRequestAck.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new PairingRequestAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingRequestAck instance
         */
        static create(properties: pairing.PairingRequestAck.$Shape): pairing.PairingRequestAck & pairing.PairingRequestAck.$Shape;
        static create(properties?: pairing.PairingRequestAck.$Properties): pairing.PairingRequestAck;

        /**
         * Encodes the specified PairingRequestAck message. Does not implicitly {@link pairing.PairingRequestAck.verify|verify} messages.
         * @param message PairingRequestAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: pairing.PairingRequestAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingRequestAck message, length delimited. Does not implicitly {@link pairing.PairingRequestAck.verify|verify} messages.
         * @param message PairingRequestAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: pairing.PairingRequestAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingRequestAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {pairing.PairingRequestAck & pairing.PairingRequestAck.$Shape} PairingRequestAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pairing.PairingRequestAck & pairing.PairingRequestAck.$Shape;

        /**
         * Decodes a PairingRequestAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {pairing.PairingRequestAck & pairing.PairingRequestAck.$Shape} PairingRequestAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pairing.PairingRequestAck & pairing.PairingRequestAck.$Shape;

        /**
         * Verifies a PairingRequestAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingRequestAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingRequestAck
         */
        static fromObject(object: { [k: string]: any }): pairing.PairingRequestAck;

        /**
         * Creates a plain object from a PairingRequestAck message. Also converts values to other types if specified.
         * @param message PairingRequestAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: pairing.PairingRequestAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingRequestAck to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PairingRequestAck
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingRequestAck {

        /** Properties of a PairingRequestAck. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PairingRequestAck. */
        type $Shape = pairing.PairingRequestAck.$Properties;
    }

    /**
     * Properties of a PairingEncoding.
     * @deprecated Use pairing.PairingEncoding.$Properties instead.
     */
    interface IPairingEncoding extends pairing.PairingEncoding.$Properties {
    }

    /** Represents a PairingEncoding. */
    class PairingEncoding {

        /**
         * Constructs a new PairingEncoding.
         * @param [properties] Properties to set
         */
        constructor(properties?: pairing.PairingEncoding.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PairingEncoding type. */
        type: pairing.EncodingType;

        /** PairingEncoding symbolLength. */
        symbolLength: number;

        /**
         * Creates a new PairingEncoding instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingEncoding instance
         */
        static create(properties: pairing.PairingEncoding.$Shape): pairing.PairingEncoding & pairing.PairingEncoding.$Shape;
        static create(properties?: pairing.PairingEncoding.$Properties): pairing.PairingEncoding;

        /**
         * Encodes the specified PairingEncoding message. Does not implicitly {@link pairing.PairingEncoding.verify|verify} messages.
         * @param message PairingEncoding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: pairing.PairingEncoding.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingEncoding message, length delimited. Does not implicitly {@link pairing.PairingEncoding.verify|verify} messages.
         * @param message PairingEncoding message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: pairing.PairingEncoding.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingEncoding message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {pairing.PairingEncoding & pairing.PairingEncoding.$Shape} PairingEncoding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pairing.PairingEncoding & pairing.PairingEncoding.$Shape;

        /**
         * Decodes a PairingEncoding message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {pairing.PairingEncoding & pairing.PairingEncoding.$Shape} PairingEncoding
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pairing.PairingEncoding & pairing.PairingEncoding.$Shape;

        /**
         * Verifies a PairingEncoding message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingEncoding message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingEncoding
         */
        static fromObject(object: { [k: string]: any }): pairing.PairingEncoding;

        /**
         * Creates a plain object from a PairingEncoding message. Also converts values to other types if specified.
         * @param message PairingEncoding
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: pairing.PairingEncoding, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingEncoding to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PairingEncoding
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingEncoding {

        /** Properties of a PairingEncoding. */
        interface $Properties {

            /** PairingEncoding type */
            type?: (pairing.EncodingType|null);

            /** PairingEncoding symbolLength */
            symbolLength?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PairingEncoding. */
        type $Shape = pairing.PairingEncoding.$Properties;
    }

    /**
     * Properties of a PairingOption.
     * @deprecated Use pairing.PairingOption.$Properties instead.
     */
    interface IPairingOption extends pairing.PairingOption.$Properties {
    }

    /** Represents a PairingOption. */
    class PairingOption {

        /**
         * Constructs a new PairingOption.
         * @param [properties] Properties to set
         */
        constructor(properties?: pairing.PairingOption.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PairingOption preferredRole. */
        preferredRole: number;

        /** PairingOption outputEncodings. */
        outputEncodings: pairing.PairingEncoding.$Properties[];

        /** PairingOption inputEncodings. */
        inputEncodings: pairing.PairingEncoding.$Properties[];

        /**
         * Creates a new PairingOption instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingOption instance
         */
        static create(properties: pairing.PairingOption.$Shape): pairing.PairingOption & pairing.PairingOption.$Shape;
        static create(properties?: pairing.PairingOption.$Properties): pairing.PairingOption;

        /**
         * Encodes the specified PairingOption message. Does not implicitly {@link pairing.PairingOption.verify|verify} messages.
         * @param message PairingOption message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: pairing.PairingOption.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingOption message, length delimited. Does not implicitly {@link pairing.PairingOption.verify|verify} messages.
         * @param message PairingOption message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: pairing.PairingOption.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingOption message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {pairing.PairingOption & pairing.PairingOption.$Shape} PairingOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pairing.PairingOption & pairing.PairingOption.$Shape;

        /**
         * Decodes a PairingOption message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {pairing.PairingOption & pairing.PairingOption.$Shape} PairingOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pairing.PairingOption & pairing.PairingOption.$Shape;

        /**
         * Verifies a PairingOption message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingOption message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingOption
         */
        static fromObject(object: { [k: string]: any }): pairing.PairingOption;

        /**
         * Creates a plain object from a PairingOption message. Also converts values to other types if specified.
         * @param message PairingOption
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: pairing.PairingOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingOption to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PairingOption
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingOption {

        /** Properties of a PairingOption. */
        interface $Properties {

            /** PairingOption preferredRole */
            preferredRole?: (number|null);

            /** PairingOption outputEncodings */
            outputEncodings?: (pairing.PairingEncoding.$Properties[]|null);

            /** PairingOption inputEncodings */
            inputEncodings?: (pairing.PairingEncoding.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PairingOption. */
        type $Shape = pairing.PairingOption.$Properties;
    }

    /**
     * Properties of a PairingConfiguration.
     * @deprecated Use pairing.PairingConfiguration.$Properties instead.
     */
    interface IPairingConfiguration extends pairing.PairingConfiguration.$Properties {
    }

    /** Represents a PairingConfiguration. */
    class PairingConfiguration {

        /**
         * Constructs a new PairingConfiguration.
         * @param [properties] Properties to set
         */
        constructor(properties?: pairing.PairingConfiguration.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PairingConfiguration encoding. */
        encoding?: (pairing.PairingEncoding.$Properties|null);

        /** PairingConfiguration clientRole. */
        clientRole: pairing.RoleType;

        /**
         * Creates a new PairingConfiguration instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingConfiguration instance
         */
        static create(properties: pairing.PairingConfiguration.$Shape): pairing.PairingConfiguration & pairing.PairingConfiguration.$Shape;
        static create(properties?: pairing.PairingConfiguration.$Properties): pairing.PairingConfiguration;

        /**
         * Encodes the specified PairingConfiguration message. Does not implicitly {@link pairing.PairingConfiguration.verify|verify} messages.
         * @param message PairingConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: pairing.PairingConfiguration.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingConfiguration message, length delimited. Does not implicitly {@link pairing.PairingConfiguration.verify|verify} messages.
         * @param message PairingConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: pairing.PairingConfiguration.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingConfiguration message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {pairing.PairingConfiguration & pairing.PairingConfiguration.$Shape} PairingConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pairing.PairingConfiguration & pairing.PairingConfiguration.$Shape;

        /**
         * Decodes a PairingConfiguration message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {pairing.PairingConfiguration & pairing.PairingConfiguration.$Shape} PairingConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pairing.PairingConfiguration & pairing.PairingConfiguration.$Shape;

        /**
         * Verifies a PairingConfiguration message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingConfiguration message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingConfiguration
         */
        static fromObject(object: { [k: string]: any }): pairing.PairingConfiguration;

        /**
         * Creates a plain object from a PairingConfiguration message. Also converts values to other types if specified.
         * @param message PairingConfiguration
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: pairing.PairingConfiguration, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingConfiguration to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PairingConfiguration
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingConfiguration {

        /** Properties of a PairingConfiguration. */
        interface $Properties {

            /** PairingConfiguration encoding */
            encoding?: (pairing.PairingEncoding.$Properties|null);

            /** PairingConfiguration clientRole */
            clientRole?: (pairing.RoleType|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PairingConfiguration. */
        type $Shape = pairing.PairingConfiguration.$Properties;
    }

    /**
     * Properties of a PairingConfigurationAck.
     * @deprecated Use pairing.PairingConfigurationAck.$Properties instead.
     */
    interface IPairingConfigurationAck extends pairing.PairingConfigurationAck.$Properties {
    }

    /** Represents a PairingConfigurationAck. */
    class PairingConfigurationAck {

        /**
         * Constructs a new PairingConfigurationAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: pairing.PairingConfigurationAck.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new PairingConfigurationAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingConfigurationAck instance
         */
        static create(properties: pairing.PairingConfigurationAck.$Shape): pairing.PairingConfigurationAck & pairing.PairingConfigurationAck.$Shape;
        static create(properties?: pairing.PairingConfigurationAck.$Properties): pairing.PairingConfigurationAck;

        /**
         * Encodes the specified PairingConfigurationAck message. Does not implicitly {@link pairing.PairingConfigurationAck.verify|verify} messages.
         * @param message PairingConfigurationAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: pairing.PairingConfigurationAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingConfigurationAck message, length delimited. Does not implicitly {@link pairing.PairingConfigurationAck.verify|verify} messages.
         * @param message PairingConfigurationAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: pairing.PairingConfigurationAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingConfigurationAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {pairing.PairingConfigurationAck & pairing.PairingConfigurationAck.$Shape} PairingConfigurationAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pairing.PairingConfigurationAck & pairing.PairingConfigurationAck.$Shape;

        /**
         * Decodes a PairingConfigurationAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {pairing.PairingConfigurationAck & pairing.PairingConfigurationAck.$Shape} PairingConfigurationAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pairing.PairingConfigurationAck & pairing.PairingConfigurationAck.$Shape;

        /**
         * Verifies a PairingConfigurationAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingConfigurationAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingConfigurationAck
         */
        static fromObject(object: { [k: string]: any }): pairing.PairingConfigurationAck;

        /**
         * Creates a plain object from a PairingConfigurationAck message. Also converts values to other types if specified.
         * @param message PairingConfigurationAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: pairing.PairingConfigurationAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingConfigurationAck to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PairingConfigurationAck
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingConfigurationAck {

        /** Properties of a PairingConfigurationAck. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PairingConfigurationAck. */
        type $Shape = pairing.PairingConfigurationAck.$Properties;
    }

    /**
     * Properties of a PairingSecret.
     * @deprecated Use pairing.PairingSecret.$Properties instead.
     */
    interface IPairingSecret extends pairing.PairingSecret.$Properties {
    }

    /** Represents a PairingSecret. */
    class PairingSecret {

        /**
         * Constructs a new PairingSecret.
         * @param [properties] Properties to set
         */
        constructor(properties?: pairing.PairingSecret.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PairingSecret secret. */
        secret: Uint8Array;

        /**
         * Creates a new PairingSecret instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingSecret instance
         */
        static create(properties: pairing.PairingSecret.$Shape): pairing.PairingSecret & pairing.PairingSecret.$Shape;
        static create(properties?: pairing.PairingSecret.$Properties): pairing.PairingSecret;

        /**
         * Encodes the specified PairingSecret message. Does not implicitly {@link pairing.PairingSecret.verify|verify} messages.
         * @param message PairingSecret message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: pairing.PairingSecret.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingSecret message, length delimited. Does not implicitly {@link pairing.PairingSecret.verify|verify} messages.
         * @param message PairingSecret message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: pairing.PairingSecret.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingSecret message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {pairing.PairingSecret & pairing.PairingSecret.$Shape} PairingSecret
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pairing.PairingSecret & pairing.PairingSecret.$Shape;

        /**
         * Decodes a PairingSecret message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {pairing.PairingSecret & pairing.PairingSecret.$Shape} PairingSecret
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pairing.PairingSecret & pairing.PairingSecret.$Shape;

        /**
         * Verifies a PairingSecret message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingSecret message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingSecret
         */
        static fromObject(object: { [k: string]: any }): pairing.PairingSecret;

        /**
         * Creates a plain object from a PairingSecret message. Also converts values to other types if specified.
         * @param message PairingSecret
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: pairing.PairingSecret, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingSecret to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PairingSecret
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingSecret {

        /** Properties of a PairingSecret. */
        interface $Properties {

            /** PairingSecret secret */
            secret?: (Uint8Array|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PairingSecret. */
        type $Shape = pairing.PairingSecret.$Properties;
    }

    /**
     * Properties of a PairingSecretAck.
     * @deprecated Use pairing.PairingSecretAck.$Properties instead.
     */
    interface IPairingSecretAck extends pairing.PairingSecretAck.$Properties {
    }

    /** Represents a PairingSecretAck. */
    class PairingSecretAck {

        /**
         * Constructs a new PairingSecretAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: pairing.PairingSecretAck.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PairingSecretAck secret. */
        secret: Uint8Array;

        /**
         * Creates a new PairingSecretAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingSecretAck instance
         */
        static create(properties: pairing.PairingSecretAck.$Shape): pairing.PairingSecretAck & pairing.PairingSecretAck.$Shape;
        static create(properties?: pairing.PairingSecretAck.$Properties): pairing.PairingSecretAck;

        /**
         * Encodes the specified PairingSecretAck message. Does not implicitly {@link pairing.PairingSecretAck.verify|verify} messages.
         * @param message PairingSecretAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: pairing.PairingSecretAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingSecretAck message, length delimited. Does not implicitly {@link pairing.PairingSecretAck.verify|verify} messages.
         * @param message PairingSecretAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: pairing.PairingSecretAck.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingSecretAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {pairing.PairingSecretAck & pairing.PairingSecretAck.$Shape} PairingSecretAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pairing.PairingSecretAck & pairing.PairingSecretAck.$Shape;

        /**
         * Decodes a PairingSecretAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {pairing.PairingSecretAck & pairing.PairingSecretAck.$Shape} PairingSecretAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pairing.PairingSecretAck & pairing.PairingSecretAck.$Shape;

        /**
         * Verifies a PairingSecretAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingSecretAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingSecretAck
         */
        static fromObject(object: { [k: string]: any }): pairing.PairingSecretAck;

        /**
         * Creates a plain object from a PairingSecretAck message. Also converts values to other types if specified.
         * @param message PairingSecretAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: pairing.PairingSecretAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingSecretAck to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PairingSecretAck
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingSecretAck {

        /** Properties of a PairingSecretAck. */
        interface $Properties {

            /** PairingSecretAck secret */
            secret?: (Uint8Array|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PairingSecretAck. */
        type $Shape = pairing.PairingSecretAck.$Properties;
    }

    /**
     * Properties of a PairingMessage.
     * @deprecated Use pairing.PairingMessage.$Properties instead.
     */
    interface IPairingMessage extends pairing.PairingMessage.$Properties {
    }

    /** Represents a PairingMessage. */
    class PairingMessage {

        /**
         * Constructs a new PairingMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: pairing.PairingMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PairingMessage status. */
        status: pairing.Status;

        /** PairingMessage protocolVersion. */
        protocolVersion: number;

        /** PairingMessage pairingRequest. */
        pairingRequest?: (pairing.PairingRequest.$Properties|null);

        /** PairingMessage pairingRequestAck. */
        pairingRequestAck?: (pairing.PairingRequestAck.$Properties|null);

        /** PairingMessage pairingOption. */
        pairingOption?: (pairing.PairingOption.$Properties|null);

        /** PairingMessage pairingConfiguration. */
        pairingConfiguration?: (pairing.PairingConfiguration.$Properties|null);

        /** PairingMessage pairingConfigurationAck. */
        pairingConfigurationAck?: (pairing.PairingConfigurationAck.$Properties|null);

        /** PairingMessage pairingSecret. */
        pairingSecret?: (pairing.PairingSecret.$Properties|null);

        /** PairingMessage pairingSecretAck. */
        pairingSecretAck?: (pairing.PairingSecretAck.$Properties|null);

        /**
         * Creates a new PairingMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairingMessage instance
         */
        static create(properties: pairing.PairingMessage.$Shape): pairing.PairingMessage & pairing.PairingMessage.$Shape;
        static create(properties?: pairing.PairingMessage.$Properties): pairing.PairingMessage;

        /**
         * Encodes the specified PairingMessage message. Does not implicitly {@link pairing.PairingMessage.verify|verify} messages.
         * @param message PairingMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: pairing.PairingMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PairingMessage message, length delimited. Does not implicitly {@link pairing.PairingMessage.verify|verify} messages.
         * @param message PairingMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: pairing.PairingMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PairingMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {pairing.PairingMessage & pairing.PairingMessage.$Shape} PairingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pairing.PairingMessage & pairing.PairingMessage.$Shape;

        /**
         * Decodes a PairingMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {pairing.PairingMessage & pairing.PairingMessage.$Shape} PairingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pairing.PairingMessage & pairing.PairingMessage.$Shape;

        /**
         * Verifies a PairingMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairingMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairingMessage
         */
        static fromObject(object: { [k: string]: any }): pairing.PairingMessage;

        /**
         * Creates a plain object from a PairingMessage message. Also converts values to other types if specified.
         * @param message PairingMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: pairing.PairingMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairingMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PairingMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PairingMessage {

        /** Properties of a PairingMessage. */
        interface $Properties {

            /** PairingMessage status */
            status?: (pairing.Status|null);

            /** PairingMessage protocolVersion */
            protocolVersion?: (number|null);

            /** PairingMessage pairingRequest */
            pairingRequest?: (pairing.PairingRequest.$Properties|null);

            /** PairingMessage pairingRequestAck */
            pairingRequestAck?: (pairing.PairingRequestAck.$Properties|null);

            /** PairingMessage pairingOption */
            pairingOption?: (pairing.PairingOption.$Properties|null);

            /** PairingMessage pairingConfiguration */
            pairingConfiguration?: (pairing.PairingConfiguration.$Properties|null);

            /** PairingMessage pairingConfigurationAck */
            pairingConfigurationAck?: (pairing.PairingConfigurationAck.$Properties|null);

            /** PairingMessage pairingSecret */
            pairingSecret?: (pairing.PairingSecret.$Properties|null);

            /** PairingMessage pairingSecretAck */
            pairingSecretAck?: (pairing.PairingSecretAck.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PairingMessage. */
        type $Shape = pairing.PairingMessage.$Properties;
    }
}
