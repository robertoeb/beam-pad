import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace remote. */
export namespace remote {

    /**
     * Properties of a RemoteAppLinkLaunchRequest.
     * @deprecated Use remote.RemoteAppLinkLaunchRequest.$Properties instead.
     */
    interface IRemoteAppLinkLaunchRequest extends remote.RemoteAppLinkLaunchRequest.$Properties {
    }

    /** Represents a RemoteAppLinkLaunchRequest. */
    class RemoteAppLinkLaunchRequest {

        /**
         * Constructs a new RemoteAppLinkLaunchRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteAppLinkLaunchRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteAppLinkLaunchRequest appLink. */
        appLink: string;

        /**
         * Creates a new RemoteAppLinkLaunchRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteAppLinkLaunchRequest instance
         */
        static create(properties: remote.RemoteAppLinkLaunchRequest.$Shape): remote.RemoteAppLinkLaunchRequest & remote.RemoteAppLinkLaunchRequest.$Shape;
        static create(properties?: remote.RemoteAppLinkLaunchRequest.$Properties): remote.RemoteAppLinkLaunchRequest;

        /**
         * Encodes the specified RemoteAppLinkLaunchRequest message. Does not implicitly {@link remote.RemoteAppLinkLaunchRequest.verify|verify} messages.
         * @param message RemoteAppLinkLaunchRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteAppLinkLaunchRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteAppLinkLaunchRequest message, length delimited. Does not implicitly {@link remote.RemoteAppLinkLaunchRequest.verify|verify} messages.
         * @param message RemoteAppLinkLaunchRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteAppLinkLaunchRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteAppLinkLaunchRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteAppLinkLaunchRequest & remote.RemoteAppLinkLaunchRequest.$Shape} RemoteAppLinkLaunchRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteAppLinkLaunchRequest & remote.RemoteAppLinkLaunchRequest.$Shape;

        /**
         * Decodes a RemoteAppLinkLaunchRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteAppLinkLaunchRequest & remote.RemoteAppLinkLaunchRequest.$Shape} RemoteAppLinkLaunchRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteAppLinkLaunchRequest & remote.RemoteAppLinkLaunchRequest.$Shape;

        /**
         * Verifies a RemoteAppLinkLaunchRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteAppLinkLaunchRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteAppLinkLaunchRequest
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteAppLinkLaunchRequest;

        /**
         * Creates a plain object from a RemoteAppLinkLaunchRequest message. Also converts values to other types if specified.
         * @param message RemoteAppLinkLaunchRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteAppLinkLaunchRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteAppLinkLaunchRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteAppLinkLaunchRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteAppLinkLaunchRequest {

        /** Properties of a RemoteAppLinkLaunchRequest. */
        interface $Properties {

            /** RemoteAppLinkLaunchRequest appLink */
            appLink?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteAppLinkLaunchRequest. */
        type $Shape = remote.RemoteAppLinkLaunchRequest.$Properties;
    }

    /**
     * Properties of a RemoteResetPreferredAudioDevice.
     * @deprecated Use remote.RemoteResetPreferredAudioDevice.$Properties instead.
     */
    interface IRemoteResetPreferredAudioDevice extends remote.RemoteResetPreferredAudioDevice.$Properties {
    }

    /** Represents a RemoteResetPreferredAudioDevice. */
    class RemoteResetPreferredAudioDevice {

        /**
         * Constructs a new RemoteResetPreferredAudioDevice.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteResetPreferredAudioDevice.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new RemoteResetPreferredAudioDevice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteResetPreferredAudioDevice instance
         */
        static create(properties: remote.RemoteResetPreferredAudioDevice.$Shape): remote.RemoteResetPreferredAudioDevice & remote.RemoteResetPreferredAudioDevice.$Shape;
        static create(properties?: remote.RemoteResetPreferredAudioDevice.$Properties): remote.RemoteResetPreferredAudioDevice;

        /**
         * Encodes the specified RemoteResetPreferredAudioDevice message. Does not implicitly {@link remote.RemoteResetPreferredAudioDevice.verify|verify} messages.
         * @param message RemoteResetPreferredAudioDevice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteResetPreferredAudioDevice.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteResetPreferredAudioDevice message, length delimited. Does not implicitly {@link remote.RemoteResetPreferredAudioDevice.verify|verify} messages.
         * @param message RemoteResetPreferredAudioDevice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteResetPreferredAudioDevice.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteResetPreferredAudioDevice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteResetPreferredAudioDevice & remote.RemoteResetPreferredAudioDevice.$Shape} RemoteResetPreferredAudioDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteResetPreferredAudioDevice & remote.RemoteResetPreferredAudioDevice.$Shape;

        /**
         * Decodes a RemoteResetPreferredAudioDevice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteResetPreferredAudioDevice & remote.RemoteResetPreferredAudioDevice.$Shape} RemoteResetPreferredAudioDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteResetPreferredAudioDevice & remote.RemoteResetPreferredAudioDevice.$Shape;

        /**
         * Verifies a RemoteResetPreferredAudioDevice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteResetPreferredAudioDevice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteResetPreferredAudioDevice
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteResetPreferredAudioDevice;

        /**
         * Creates a plain object from a RemoteResetPreferredAudioDevice message. Also converts values to other types if specified.
         * @param message RemoteResetPreferredAudioDevice
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteResetPreferredAudioDevice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteResetPreferredAudioDevice to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteResetPreferredAudioDevice
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteResetPreferredAudioDevice {

        /** Properties of a RemoteResetPreferredAudioDevice. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteResetPreferredAudioDevice. */
        type $Shape = remote.RemoteResetPreferredAudioDevice.$Properties;
    }

    /**
     * Properties of a RemoteSetPreferredAudioDevice.
     * @deprecated Use remote.RemoteSetPreferredAudioDevice.$Properties instead.
     */
    interface IRemoteSetPreferredAudioDevice extends remote.RemoteSetPreferredAudioDevice.$Properties {
    }

    /** Represents a RemoteSetPreferredAudioDevice. */
    class RemoteSetPreferredAudioDevice {

        /**
         * Constructs a new RemoteSetPreferredAudioDevice.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteSetPreferredAudioDevice.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new RemoteSetPreferredAudioDevice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteSetPreferredAudioDevice instance
         */
        static create(properties: remote.RemoteSetPreferredAudioDevice.$Shape): remote.RemoteSetPreferredAudioDevice & remote.RemoteSetPreferredAudioDevice.$Shape;
        static create(properties?: remote.RemoteSetPreferredAudioDevice.$Properties): remote.RemoteSetPreferredAudioDevice;

        /**
         * Encodes the specified RemoteSetPreferredAudioDevice message. Does not implicitly {@link remote.RemoteSetPreferredAudioDevice.verify|verify} messages.
         * @param message RemoteSetPreferredAudioDevice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteSetPreferredAudioDevice.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteSetPreferredAudioDevice message, length delimited. Does not implicitly {@link remote.RemoteSetPreferredAudioDevice.verify|verify} messages.
         * @param message RemoteSetPreferredAudioDevice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteSetPreferredAudioDevice.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteSetPreferredAudioDevice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteSetPreferredAudioDevice & remote.RemoteSetPreferredAudioDevice.$Shape} RemoteSetPreferredAudioDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteSetPreferredAudioDevice & remote.RemoteSetPreferredAudioDevice.$Shape;

        /**
         * Decodes a RemoteSetPreferredAudioDevice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteSetPreferredAudioDevice & remote.RemoteSetPreferredAudioDevice.$Shape} RemoteSetPreferredAudioDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteSetPreferredAudioDevice & remote.RemoteSetPreferredAudioDevice.$Shape;

        /**
         * Verifies a RemoteSetPreferredAudioDevice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteSetPreferredAudioDevice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteSetPreferredAudioDevice
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteSetPreferredAudioDevice;

        /**
         * Creates a plain object from a RemoteSetPreferredAudioDevice message. Also converts values to other types if specified.
         * @param message RemoteSetPreferredAudioDevice
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteSetPreferredAudioDevice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteSetPreferredAudioDevice to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteSetPreferredAudioDevice
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteSetPreferredAudioDevice {

        /** Properties of a RemoteSetPreferredAudioDevice. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteSetPreferredAudioDevice. */
        type $Shape = remote.RemoteSetPreferredAudioDevice.$Properties;
    }

    /**
     * Properties of a RemoteAdjustVolumeLevel.
     * @deprecated Use remote.RemoteAdjustVolumeLevel.$Properties instead.
     */
    interface IRemoteAdjustVolumeLevel extends remote.RemoteAdjustVolumeLevel.$Properties {
    }

    /** Represents a RemoteAdjustVolumeLevel. */
    class RemoteAdjustVolumeLevel {

        /**
         * Constructs a new RemoteAdjustVolumeLevel.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteAdjustVolumeLevel.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new RemoteAdjustVolumeLevel instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteAdjustVolumeLevel instance
         */
        static create(properties: remote.RemoteAdjustVolumeLevel.$Shape): remote.RemoteAdjustVolumeLevel & remote.RemoteAdjustVolumeLevel.$Shape;
        static create(properties?: remote.RemoteAdjustVolumeLevel.$Properties): remote.RemoteAdjustVolumeLevel;

        /**
         * Encodes the specified RemoteAdjustVolumeLevel message. Does not implicitly {@link remote.RemoteAdjustVolumeLevel.verify|verify} messages.
         * @param message RemoteAdjustVolumeLevel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteAdjustVolumeLevel.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteAdjustVolumeLevel message, length delimited. Does not implicitly {@link remote.RemoteAdjustVolumeLevel.verify|verify} messages.
         * @param message RemoteAdjustVolumeLevel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteAdjustVolumeLevel.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteAdjustVolumeLevel message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteAdjustVolumeLevel & remote.RemoteAdjustVolumeLevel.$Shape} RemoteAdjustVolumeLevel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteAdjustVolumeLevel & remote.RemoteAdjustVolumeLevel.$Shape;

        /**
         * Decodes a RemoteAdjustVolumeLevel message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteAdjustVolumeLevel & remote.RemoteAdjustVolumeLevel.$Shape} RemoteAdjustVolumeLevel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteAdjustVolumeLevel & remote.RemoteAdjustVolumeLevel.$Shape;

        /**
         * Verifies a RemoteAdjustVolumeLevel message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteAdjustVolumeLevel message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteAdjustVolumeLevel
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteAdjustVolumeLevel;

        /**
         * Creates a plain object from a RemoteAdjustVolumeLevel message. Also converts values to other types if specified.
         * @param message RemoteAdjustVolumeLevel
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteAdjustVolumeLevel, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteAdjustVolumeLevel to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteAdjustVolumeLevel
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteAdjustVolumeLevel {

        /** Properties of a RemoteAdjustVolumeLevel. */
        interface $Properties {

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteAdjustVolumeLevel. */
        type $Shape = remote.RemoteAdjustVolumeLevel.$Properties;
    }

    /**
     * Properties of a RemoteSetVolumeLevel.
     * @deprecated Use remote.RemoteSetVolumeLevel.$Properties instead.
     */
    interface IRemoteSetVolumeLevel extends remote.RemoteSetVolumeLevel.$Properties {
    }

    /** Represents a RemoteSetVolumeLevel. */
    class RemoteSetVolumeLevel {

        /**
         * Constructs a new RemoteSetVolumeLevel.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteSetVolumeLevel.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteSetVolumeLevel unknown1. */
        unknown1: number;

        /** RemoteSetVolumeLevel unknown2. */
        unknown2: number;

        /** RemoteSetVolumeLevel playerModel. */
        playerModel: string;

        /** RemoteSetVolumeLevel unknown4. */
        unknown4: number;

        /** RemoteSetVolumeLevel unknown5. */
        unknown5: number;

        /** RemoteSetVolumeLevel volumeMax. */
        volumeMax: number;

        /** RemoteSetVolumeLevel volumeLevel. */
        volumeLevel: number;

        /** RemoteSetVolumeLevel volumeMuted. */
        volumeMuted: boolean;

        /**
         * Creates a new RemoteSetVolumeLevel instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteSetVolumeLevel instance
         */
        static create(properties: remote.RemoteSetVolumeLevel.$Shape): remote.RemoteSetVolumeLevel & remote.RemoteSetVolumeLevel.$Shape;
        static create(properties?: remote.RemoteSetVolumeLevel.$Properties): remote.RemoteSetVolumeLevel;

        /**
         * Encodes the specified RemoteSetVolumeLevel message. Does not implicitly {@link remote.RemoteSetVolumeLevel.verify|verify} messages.
         * @param message RemoteSetVolumeLevel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteSetVolumeLevel.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteSetVolumeLevel message, length delimited. Does not implicitly {@link remote.RemoteSetVolumeLevel.verify|verify} messages.
         * @param message RemoteSetVolumeLevel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteSetVolumeLevel.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteSetVolumeLevel message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteSetVolumeLevel & remote.RemoteSetVolumeLevel.$Shape} RemoteSetVolumeLevel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteSetVolumeLevel & remote.RemoteSetVolumeLevel.$Shape;

        /**
         * Decodes a RemoteSetVolumeLevel message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteSetVolumeLevel & remote.RemoteSetVolumeLevel.$Shape} RemoteSetVolumeLevel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteSetVolumeLevel & remote.RemoteSetVolumeLevel.$Shape;

        /**
         * Verifies a RemoteSetVolumeLevel message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteSetVolumeLevel message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteSetVolumeLevel
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteSetVolumeLevel;

        /**
         * Creates a plain object from a RemoteSetVolumeLevel message. Also converts values to other types if specified.
         * @param message RemoteSetVolumeLevel
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteSetVolumeLevel, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteSetVolumeLevel to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteSetVolumeLevel
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteSetVolumeLevel {

        /** Properties of a RemoteSetVolumeLevel. */
        interface $Properties {

            /** RemoteSetVolumeLevel unknown1 */
            unknown1?: (number|null);

            /** RemoteSetVolumeLevel unknown2 */
            unknown2?: (number|null);

            /** RemoteSetVolumeLevel playerModel */
            playerModel?: (string|null);

            /** RemoteSetVolumeLevel unknown4 */
            unknown4?: (number|null);

            /** RemoteSetVolumeLevel unknown5 */
            unknown5?: (number|null);

            /** RemoteSetVolumeLevel volumeMax */
            volumeMax?: (number|null);

            /** RemoteSetVolumeLevel volumeLevel */
            volumeLevel?: (number|null);

            /** RemoteSetVolumeLevel volumeMuted */
            volumeMuted?: (boolean|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteSetVolumeLevel. */
        type $Shape = remote.RemoteSetVolumeLevel.$Properties;
    }

    /**
     * Properties of a RemoteStart.
     * @deprecated Use remote.RemoteStart.$Properties instead.
     */
    interface IRemoteStart extends remote.RemoteStart.$Properties {
    }

    /** Represents a RemoteStart. */
    class RemoteStart {

        /**
         * Constructs a new RemoteStart.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteStart.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteStart started. */
        started: boolean;

        /**
         * Creates a new RemoteStart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteStart instance
         */
        static create(properties: remote.RemoteStart.$Shape): remote.RemoteStart & remote.RemoteStart.$Shape;
        static create(properties?: remote.RemoteStart.$Properties): remote.RemoteStart;

        /**
         * Encodes the specified RemoteStart message. Does not implicitly {@link remote.RemoteStart.verify|verify} messages.
         * @param message RemoteStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteStart.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteStart message, length delimited. Does not implicitly {@link remote.RemoteStart.verify|verify} messages.
         * @param message RemoteStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteStart.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteStart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteStart & remote.RemoteStart.$Shape} RemoteStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteStart & remote.RemoteStart.$Shape;

        /**
         * Decodes a RemoteStart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteStart & remote.RemoteStart.$Shape} RemoteStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteStart & remote.RemoteStart.$Shape;

        /**
         * Verifies a RemoteStart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteStart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteStart
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteStart;

        /**
         * Creates a plain object from a RemoteStart message. Also converts values to other types if specified.
         * @param message RemoteStart
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteStart, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteStart to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteStart
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteStart {

        /** Properties of a RemoteStart. */
        interface $Properties {

            /** RemoteStart started */
            started?: (boolean|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteStart. */
        type $Shape = remote.RemoteStart.$Properties;
    }

    /**
     * Properties of a RemoteVoiceEnd.
     * @deprecated Use remote.RemoteVoiceEnd.$Properties instead.
     */
    interface IRemoteVoiceEnd extends remote.RemoteVoiceEnd.$Properties {
    }

    /** Represents a RemoteVoiceEnd. */
    class RemoteVoiceEnd {

        /**
         * Constructs a new RemoteVoiceEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteVoiceEnd.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteVoiceEnd sessionId. */
        sessionId: number;

        /**
         * Creates a new RemoteVoiceEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteVoiceEnd instance
         */
        static create(properties: remote.RemoteVoiceEnd.$Shape): remote.RemoteVoiceEnd & remote.RemoteVoiceEnd.$Shape;
        static create(properties?: remote.RemoteVoiceEnd.$Properties): remote.RemoteVoiceEnd;

        /**
         * Encodes the specified RemoteVoiceEnd message. Does not implicitly {@link remote.RemoteVoiceEnd.verify|verify} messages.
         * @param message RemoteVoiceEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteVoiceEnd.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteVoiceEnd message, length delimited. Does not implicitly {@link remote.RemoteVoiceEnd.verify|verify} messages.
         * @param message RemoteVoiceEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteVoiceEnd.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteVoiceEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteVoiceEnd & remote.RemoteVoiceEnd.$Shape} RemoteVoiceEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteVoiceEnd & remote.RemoteVoiceEnd.$Shape;

        /**
         * Decodes a RemoteVoiceEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteVoiceEnd & remote.RemoteVoiceEnd.$Shape} RemoteVoiceEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteVoiceEnd & remote.RemoteVoiceEnd.$Shape;

        /**
         * Verifies a RemoteVoiceEnd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteVoiceEnd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteVoiceEnd
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteVoiceEnd;

        /**
         * Creates a plain object from a RemoteVoiceEnd message. Also converts values to other types if specified.
         * @param message RemoteVoiceEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteVoiceEnd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteVoiceEnd to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteVoiceEnd
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteVoiceEnd {

        /** Properties of a RemoteVoiceEnd. */
        interface $Properties {

            /** RemoteVoiceEnd sessionId */
            sessionId?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteVoiceEnd. */
        type $Shape = remote.RemoteVoiceEnd.$Properties;
    }

    /**
     * Properties of a RemoteVoicePayload.
     * @deprecated Use remote.RemoteVoicePayload.$Properties instead.
     */
    interface IRemoteVoicePayload extends remote.RemoteVoicePayload.$Properties {
    }

    /** Represents a RemoteVoicePayload. */
    class RemoteVoicePayload {

        /**
         * Constructs a new RemoteVoicePayload.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteVoicePayload.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteVoicePayload sessionId. */
        sessionId: number;

        /** RemoteVoicePayload samples. */
        samples: Uint8Array;

        /**
         * Creates a new RemoteVoicePayload instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteVoicePayload instance
         */
        static create(properties: remote.RemoteVoicePayload.$Shape): remote.RemoteVoicePayload & remote.RemoteVoicePayload.$Shape;
        static create(properties?: remote.RemoteVoicePayload.$Properties): remote.RemoteVoicePayload;

        /**
         * Encodes the specified RemoteVoicePayload message. Does not implicitly {@link remote.RemoteVoicePayload.verify|verify} messages.
         * @param message RemoteVoicePayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteVoicePayload.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteVoicePayload message, length delimited. Does not implicitly {@link remote.RemoteVoicePayload.verify|verify} messages.
         * @param message RemoteVoicePayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteVoicePayload.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteVoicePayload message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteVoicePayload & remote.RemoteVoicePayload.$Shape} RemoteVoicePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteVoicePayload & remote.RemoteVoicePayload.$Shape;

        /**
         * Decodes a RemoteVoicePayload message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteVoicePayload & remote.RemoteVoicePayload.$Shape} RemoteVoicePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteVoicePayload & remote.RemoteVoicePayload.$Shape;

        /**
         * Verifies a RemoteVoicePayload message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteVoicePayload message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteVoicePayload
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteVoicePayload;

        /**
         * Creates a plain object from a RemoteVoicePayload message. Also converts values to other types if specified.
         * @param message RemoteVoicePayload
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteVoicePayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteVoicePayload to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteVoicePayload
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteVoicePayload {

        /** Properties of a RemoteVoicePayload. */
        interface $Properties {

            /** RemoteVoicePayload sessionId */
            sessionId?: (number|null);

            /** RemoteVoicePayload samples */
            samples?: (Uint8Array|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteVoicePayload. */
        type $Shape = remote.RemoteVoicePayload.$Properties;
    }

    /**
     * Properties of a RemoteVoiceBegin.
     * @deprecated Use remote.RemoteVoiceBegin.$Properties instead.
     */
    interface IRemoteVoiceBegin extends remote.RemoteVoiceBegin.$Properties {
    }

    /** Represents a RemoteVoiceBegin. */
    class RemoteVoiceBegin {

        /**
         * Constructs a new RemoteVoiceBegin.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteVoiceBegin.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteVoiceBegin sessionId. */
        sessionId: number;

        /** RemoteVoiceBegin packageName. */
        packageName: string;

        /**
         * Creates a new RemoteVoiceBegin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteVoiceBegin instance
         */
        static create(properties: remote.RemoteVoiceBegin.$Shape): remote.RemoteVoiceBegin & remote.RemoteVoiceBegin.$Shape;
        static create(properties?: remote.RemoteVoiceBegin.$Properties): remote.RemoteVoiceBegin;

        /**
         * Encodes the specified RemoteVoiceBegin message. Does not implicitly {@link remote.RemoteVoiceBegin.verify|verify} messages.
         * @param message RemoteVoiceBegin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteVoiceBegin.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteVoiceBegin message, length delimited. Does not implicitly {@link remote.RemoteVoiceBegin.verify|verify} messages.
         * @param message RemoteVoiceBegin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteVoiceBegin.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteVoiceBegin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteVoiceBegin & remote.RemoteVoiceBegin.$Shape} RemoteVoiceBegin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteVoiceBegin & remote.RemoteVoiceBegin.$Shape;

        /**
         * Decodes a RemoteVoiceBegin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteVoiceBegin & remote.RemoteVoiceBegin.$Shape} RemoteVoiceBegin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteVoiceBegin & remote.RemoteVoiceBegin.$Shape;

        /**
         * Verifies a RemoteVoiceBegin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteVoiceBegin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteVoiceBegin
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteVoiceBegin;

        /**
         * Creates a plain object from a RemoteVoiceBegin message. Also converts values to other types if specified.
         * @param message RemoteVoiceBegin
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteVoiceBegin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteVoiceBegin to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteVoiceBegin
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteVoiceBegin {

        /** Properties of a RemoteVoiceBegin. */
        interface $Properties {

            /** RemoteVoiceBegin sessionId */
            sessionId?: (number|null);

            /** RemoteVoiceBegin packageName */
            packageName?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteVoiceBegin. */
        type $Shape = remote.RemoteVoiceBegin.$Properties;
    }

    /**
     * Properties of a RemoteTextFieldStatus.
     * @deprecated Use remote.RemoteTextFieldStatus.$Properties instead.
     */
    interface IRemoteTextFieldStatus extends remote.RemoteTextFieldStatus.$Properties {
    }

    /** Represents a RemoteTextFieldStatus. */
    class RemoteTextFieldStatus {

        /**
         * Constructs a new RemoteTextFieldStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteTextFieldStatus.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteTextFieldStatus counterField. */
        counterField: number;

        /** RemoteTextFieldStatus value. */
        value: string;

        /** RemoteTextFieldStatus start. */
        start: number;

        /** RemoteTextFieldStatus end. */
        end: number;

        /** RemoteTextFieldStatus int5. */
        int5: number;

        /** RemoteTextFieldStatus label. */
        label: string;

        /**
         * Creates a new RemoteTextFieldStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteTextFieldStatus instance
         */
        static create(properties: remote.RemoteTextFieldStatus.$Shape): remote.RemoteTextFieldStatus & remote.RemoteTextFieldStatus.$Shape;
        static create(properties?: remote.RemoteTextFieldStatus.$Properties): remote.RemoteTextFieldStatus;

        /**
         * Encodes the specified RemoteTextFieldStatus message. Does not implicitly {@link remote.RemoteTextFieldStatus.verify|verify} messages.
         * @param message RemoteTextFieldStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteTextFieldStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteTextFieldStatus message, length delimited. Does not implicitly {@link remote.RemoteTextFieldStatus.verify|verify} messages.
         * @param message RemoteTextFieldStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteTextFieldStatus.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteTextFieldStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteTextFieldStatus & remote.RemoteTextFieldStatus.$Shape} RemoteTextFieldStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteTextFieldStatus & remote.RemoteTextFieldStatus.$Shape;

        /**
         * Decodes a RemoteTextFieldStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteTextFieldStatus & remote.RemoteTextFieldStatus.$Shape} RemoteTextFieldStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteTextFieldStatus & remote.RemoteTextFieldStatus.$Shape;

        /**
         * Verifies a RemoteTextFieldStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteTextFieldStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteTextFieldStatus
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteTextFieldStatus;

        /**
         * Creates a plain object from a RemoteTextFieldStatus message. Also converts values to other types if specified.
         * @param message RemoteTextFieldStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteTextFieldStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteTextFieldStatus to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteTextFieldStatus
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteTextFieldStatus {

        /** Properties of a RemoteTextFieldStatus. */
        interface $Properties {

            /** RemoteTextFieldStatus counterField */
            counterField?: (number|null);

            /** RemoteTextFieldStatus value */
            value?: (string|null);

            /** RemoteTextFieldStatus start */
            start?: (number|null);

            /** RemoteTextFieldStatus end */
            end?: (number|null);

            /** RemoteTextFieldStatus int5 */
            int5?: (number|null);

            /** RemoteTextFieldStatus label */
            label?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteTextFieldStatus. */
        type $Shape = remote.RemoteTextFieldStatus.$Properties;
    }

    /**
     * Properties of a RemoteImeShowRequest.
     * @deprecated Use remote.RemoteImeShowRequest.$Properties instead.
     */
    interface IRemoteImeShowRequest extends remote.RemoteImeShowRequest.$Properties {
    }

    /** Represents a RemoteImeShowRequest. */
    class RemoteImeShowRequest {

        /**
         * Constructs a new RemoteImeShowRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteImeShowRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteImeShowRequest remoteTextFieldStatus. */
        remoteTextFieldStatus?: (remote.RemoteTextFieldStatus.$Properties|null);

        /**
         * Creates a new RemoteImeShowRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteImeShowRequest instance
         */
        static create(properties: remote.RemoteImeShowRequest.$Shape): remote.RemoteImeShowRequest & remote.RemoteImeShowRequest.$Shape;
        static create(properties?: remote.RemoteImeShowRequest.$Properties): remote.RemoteImeShowRequest;

        /**
         * Encodes the specified RemoteImeShowRequest message. Does not implicitly {@link remote.RemoteImeShowRequest.verify|verify} messages.
         * @param message RemoteImeShowRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteImeShowRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteImeShowRequest message, length delimited. Does not implicitly {@link remote.RemoteImeShowRequest.verify|verify} messages.
         * @param message RemoteImeShowRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteImeShowRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteImeShowRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteImeShowRequest & remote.RemoteImeShowRequest.$Shape} RemoteImeShowRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteImeShowRequest & remote.RemoteImeShowRequest.$Shape;

        /**
         * Decodes a RemoteImeShowRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteImeShowRequest & remote.RemoteImeShowRequest.$Shape} RemoteImeShowRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteImeShowRequest & remote.RemoteImeShowRequest.$Shape;

        /**
         * Verifies a RemoteImeShowRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteImeShowRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteImeShowRequest
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteImeShowRequest;

        /**
         * Creates a plain object from a RemoteImeShowRequest message. Also converts values to other types if specified.
         * @param message RemoteImeShowRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteImeShowRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteImeShowRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteImeShowRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteImeShowRequest {

        /** Properties of a RemoteImeShowRequest. */
        interface $Properties {

            /** RemoteImeShowRequest remoteTextFieldStatus */
            remoteTextFieldStatus?: (remote.RemoteTextFieldStatus.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteImeShowRequest. */
        type $Shape = remote.RemoteImeShowRequest.$Properties;
    }

    /**
     * Properties of a RemoteEditInfo.
     * @deprecated Use remote.RemoteEditInfo.$Properties instead.
     */
    interface IRemoteEditInfo extends remote.RemoteEditInfo.$Properties {
    }

    /** Represents a RemoteEditInfo. */
    class RemoteEditInfo {

        /**
         * Constructs a new RemoteEditInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteEditInfo.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteEditInfo insert. */
        insert: number;

        /** RemoteEditInfo textFieldStatus. */
        textFieldStatus?: (remote.RemoteImeObject.$Properties|null);

        /**
         * Creates a new RemoteEditInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteEditInfo instance
         */
        static create(properties: remote.RemoteEditInfo.$Shape): remote.RemoteEditInfo & remote.RemoteEditInfo.$Shape;
        static create(properties?: remote.RemoteEditInfo.$Properties): remote.RemoteEditInfo;

        /**
         * Encodes the specified RemoteEditInfo message. Does not implicitly {@link remote.RemoteEditInfo.verify|verify} messages.
         * @param message RemoteEditInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteEditInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteEditInfo message, length delimited. Does not implicitly {@link remote.RemoteEditInfo.verify|verify} messages.
         * @param message RemoteEditInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteEditInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteEditInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteEditInfo & remote.RemoteEditInfo.$Shape} RemoteEditInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteEditInfo & remote.RemoteEditInfo.$Shape;

        /**
         * Decodes a RemoteEditInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteEditInfo & remote.RemoteEditInfo.$Shape} RemoteEditInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteEditInfo & remote.RemoteEditInfo.$Shape;

        /**
         * Verifies a RemoteEditInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteEditInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteEditInfo
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteEditInfo;

        /**
         * Creates a plain object from a RemoteEditInfo message. Also converts values to other types if specified.
         * @param message RemoteEditInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteEditInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteEditInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteEditInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteEditInfo {

        /** Properties of a RemoteEditInfo. */
        interface $Properties {

            /** RemoteEditInfo insert */
            insert?: (number|null);

            /** RemoteEditInfo textFieldStatus */
            textFieldStatus?: (remote.RemoteImeObject.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteEditInfo. */
        type $Shape = remote.RemoteEditInfo.$Properties;
    }

    /**
     * Properties of a RemoteImeObject.
     * @deprecated Use remote.RemoteImeObject.$Properties instead.
     */
    interface IRemoteImeObject extends remote.RemoteImeObject.$Properties {
    }

    /** Represents a RemoteImeObject. */
    class RemoteImeObject {

        /**
         * Constructs a new RemoteImeObject.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteImeObject.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteImeObject start. */
        start: number;

        /** RemoteImeObject end. */
        end: number;

        /** RemoteImeObject value. */
        value: string;

        /**
         * Creates a new RemoteImeObject instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteImeObject instance
         */
        static create(properties: remote.RemoteImeObject.$Shape): remote.RemoteImeObject & remote.RemoteImeObject.$Shape;
        static create(properties?: remote.RemoteImeObject.$Properties): remote.RemoteImeObject;

        /**
         * Encodes the specified RemoteImeObject message. Does not implicitly {@link remote.RemoteImeObject.verify|verify} messages.
         * @param message RemoteImeObject message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteImeObject.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteImeObject message, length delimited. Does not implicitly {@link remote.RemoteImeObject.verify|verify} messages.
         * @param message RemoteImeObject message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteImeObject.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteImeObject message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteImeObject & remote.RemoteImeObject.$Shape} RemoteImeObject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteImeObject & remote.RemoteImeObject.$Shape;

        /**
         * Decodes a RemoteImeObject message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteImeObject & remote.RemoteImeObject.$Shape} RemoteImeObject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteImeObject & remote.RemoteImeObject.$Shape;

        /**
         * Verifies a RemoteImeObject message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteImeObject message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteImeObject
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteImeObject;

        /**
         * Creates a plain object from a RemoteImeObject message. Also converts values to other types if specified.
         * @param message RemoteImeObject
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteImeObject, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteImeObject to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteImeObject
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteImeObject {

        /** Properties of a RemoteImeObject. */
        interface $Properties {

            /** RemoteImeObject start */
            start?: (number|null);

            /** RemoteImeObject end */
            end?: (number|null);

            /** RemoteImeObject value */
            value?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteImeObject. */
        type $Shape = remote.RemoteImeObject.$Properties;
    }

    /**
     * Properties of a RemoteImeBatchEdit.
     * @deprecated Use remote.RemoteImeBatchEdit.$Properties instead.
     */
    interface IRemoteImeBatchEdit extends remote.RemoteImeBatchEdit.$Properties {
    }

    /** Represents a RemoteImeBatchEdit. */
    class RemoteImeBatchEdit {

        /**
         * Constructs a new RemoteImeBatchEdit.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteImeBatchEdit.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteImeBatchEdit imeCounter. */
        imeCounter: number;

        /** RemoteImeBatchEdit fieldCounter. */
        fieldCounter: number;

        /** RemoteImeBatchEdit editInfo. */
        editInfo: remote.RemoteEditInfo.$Properties[];

        /**
         * Creates a new RemoteImeBatchEdit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteImeBatchEdit instance
         */
        static create(properties: remote.RemoteImeBatchEdit.$Shape): remote.RemoteImeBatchEdit & remote.RemoteImeBatchEdit.$Shape;
        static create(properties?: remote.RemoteImeBatchEdit.$Properties): remote.RemoteImeBatchEdit;

        /**
         * Encodes the specified RemoteImeBatchEdit message. Does not implicitly {@link remote.RemoteImeBatchEdit.verify|verify} messages.
         * @param message RemoteImeBatchEdit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteImeBatchEdit.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteImeBatchEdit message, length delimited. Does not implicitly {@link remote.RemoteImeBatchEdit.verify|verify} messages.
         * @param message RemoteImeBatchEdit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteImeBatchEdit.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteImeBatchEdit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteImeBatchEdit & remote.RemoteImeBatchEdit.$Shape} RemoteImeBatchEdit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteImeBatchEdit & remote.RemoteImeBatchEdit.$Shape;

        /**
         * Decodes a RemoteImeBatchEdit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteImeBatchEdit & remote.RemoteImeBatchEdit.$Shape} RemoteImeBatchEdit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteImeBatchEdit & remote.RemoteImeBatchEdit.$Shape;

        /**
         * Verifies a RemoteImeBatchEdit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteImeBatchEdit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteImeBatchEdit
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteImeBatchEdit;

        /**
         * Creates a plain object from a RemoteImeBatchEdit message. Also converts values to other types if specified.
         * @param message RemoteImeBatchEdit
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteImeBatchEdit, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteImeBatchEdit to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteImeBatchEdit
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteImeBatchEdit {

        /** Properties of a RemoteImeBatchEdit. */
        interface $Properties {

            /** RemoteImeBatchEdit imeCounter */
            imeCounter?: (number|null);

            /** RemoteImeBatchEdit fieldCounter */
            fieldCounter?: (number|null);

            /** RemoteImeBatchEdit editInfo */
            editInfo?: (remote.RemoteEditInfo.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteImeBatchEdit. */
        type $Shape = remote.RemoteImeBatchEdit.$Properties;
    }

    /**
     * Properties of a RemoteAppInfo.
     * @deprecated Use remote.RemoteAppInfo.$Properties instead.
     */
    interface IRemoteAppInfo extends remote.RemoteAppInfo.$Properties {
    }

    /** Represents a RemoteAppInfo. */
    class RemoteAppInfo {

        /**
         * Constructs a new RemoteAppInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteAppInfo.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteAppInfo counter. */
        counter: number;

        /** RemoteAppInfo int2. */
        int2: number;

        /** RemoteAppInfo int3. */
        int3: number;

        /** RemoteAppInfo int4. */
        int4: string;

        /** RemoteAppInfo int7. */
        int7: number;

        /** RemoteAppInfo int8. */
        int8: number;

        /** RemoteAppInfo label. */
        label: string;

        /** RemoteAppInfo appPackage. */
        appPackage: string;

        /** RemoteAppInfo int13. */
        int13: number;

        /**
         * Creates a new RemoteAppInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteAppInfo instance
         */
        static create(properties: remote.RemoteAppInfo.$Shape): remote.RemoteAppInfo & remote.RemoteAppInfo.$Shape;
        static create(properties?: remote.RemoteAppInfo.$Properties): remote.RemoteAppInfo;

        /**
         * Encodes the specified RemoteAppInfo message. Does not implicitly {@link remote.RemoteAppInfo.verify|verify} messages.
         * @param message RemoteAppInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteAppInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteAppInfo message, length delimited. Does not implicitly {@link remote.RemoteAppInfo.verify|verify} messages.
         * @param message RemoteAppInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteAppInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteAppInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteAppInfo & remote.RemoteAppInfo.$Shape} RemoteAppInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteAppInfo & remote.RemoteAppInfo.$Shape;

        /**
         * Decodes a RemoteAppInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteAppInfo & remote.RemoteAppInfo.$Shape} RemoteAppInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteAppInfo & remote.RemoteAppInfo.$Shape;

        /**
         * Verifies a RemoteAppInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteAppInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteAppInfo
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteAppInfo;

        /**
         * Creates a plain object from a RemoteAppInfo message. Also converts values to other types if specified.
         * @param message RemoteAppInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteAppInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteAppInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteAppInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteAppInfo {

        /** Properties of a RemoteAppInfo. */
        interface $Properties {

            /** RemoteAppInfo counter */
            counter?: (number|null);

            /** RemoteAppInfo int2 */
            int2?: (number|null);

            /** RemoteAppInfo int3 */
            int3?: (number|null);

            /** RemoteAppInfo int4 */
            int4?: (string|null);

            /** RemoteAppInfo int7 */
            int7?: (number|null);

            /** RemoteAppInfo int8 */
            int8?: (number|null);

            /** RemoteAppInfo label */
            label?: (string|null);

            /** RemoteAppInfo appPackage */
            appPackage?: (string|null);

            /** RemoteAppInfo int13 */
            int13?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteAppInfo. */
        type $Shape = remote.RemoteAppInfo.$Properties;
    }

    /**
     * Properties of a RemoteImeKeyInject.
     * @deprecated Use remote.RemoteImeKeyInject.$Properties instead.
     */
    interface IRemoteImeKeyInject extends remote.RemoteImeKeyInject.$Properties {
    }

    /** Represents a RemoteImeKeyInject. */
    class RemoteImeKeyInject {

        /**
         * Constructs a new RemoteImeKeyInject.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteImeKeyInject.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteImeKeyInject appInfo. */
        appInfo?: (remote.RemoteAppInfo.$Properties|null);

        /** RemoteImeKeyInject textFieldStatus. */
        textFieldStatus?: (remote.RemoteTextFieldStatus.$Properties|null);

        /**
         * Creates a new RemoteImeKeyInject instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteImeKeyInject instance
         */
        static create(properties: remote.RemoteImeKeyInject.$Shape): remote.RemoteImeKeyInject & remote.RemoteImeKeyInject.$Shape;
        static create(properties?: remote.RemoteImeKeyInject.$Properties): remote.RemoteImeKeyInject;

        /**
         * Encodes the specified RemoteImeKeyInject message. Does not implicitly {@link remote.RemoteImeKeyInject.verify|verify} messages.
         * @param message RemoteImeKeyInject message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteImeKeyInject.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteImeKeyInject message, length delimited. Does not implicitly {@link remote.RemoteImeKeyInject.verify|verify} messages.
         * @param message RemoteImeKeyInject message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteImeKeyInject.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteImeKeyInject message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteImeKeyInject & remote.RemoteImeKeyInject.$Shape} RemoteImeKeyInject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteImeKeyInject & remote.RemoteImeKeyInject.$Shape;

        /**
         * Decodes a RemoteImeKeyInject message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteImeKeyInject & remote.RemoteImeKeyInject.$Shape} RemoteImeKeyInject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteImeKeyInject & remote.RemoteImeKeyInject.$Shape;

        /**
         * Verifies a RemoteImeKeyInject message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteImeKeyInject message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteImeKeyInject
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteImeKeyInject;

        /**
         * Creates a plain object from a RemoteImeKeyInject message. Also converts values to other types if specified.
         * @param message RemoteImeKeyInject
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteImeKeyInject, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteImeKeyInject to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteImeKeyInject
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteImeKeyInject {

        /** Properties of a RemoteImeKeyInject. */
        interface $Properties {

            /** RemoteImeKeyInject appInfo */
            appInfo?: (remote.RemoteAppInfo.$Properties|null);

            /** RemoteImeKeyInject textFieldStatus */
            textFieldStatus?: (remote.RemoteTextFieldStatus.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteImeKeyInject. */
        type $Shape = remote.RemoteImeKeyInject.$Properties;
    }

    /** RemoteDirection enum. */
    enum RemoteDirection {

        /** UNKNOWN_DIRECTION value */
        UNKNOWN_DIRECTION = 0,

        /** START_LONG value */
        START_LONG = 1,

        /** END_LONG value */
        END_LONG = 2,

        /** SHORT value */
        SHORT = 3
    }

    /**
     * Properties of a RemoteKeyInject.
     * @deprecated Use remote.RemoteKeyInject.$Properties instead.
     */
    interface IRemoteKeyInject extends remote.RemoteKeyInject.$Properties {
    }

    /** Represents a RemoteKeyInject. */
    class RemoteKeyInject {

        /**
         * Constructs a new RemoteKeyInject.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteKeyInject.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteKeyInject keyCode. */
        keyCode: remote.RemoteKeyCode;

        /** RemoteKeyInject direction. */
        direction: remote.RemoteDirection;

        /**
         * Creates a new RemoteKeyInject instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteKeyInject instance
         */
        static create(properties: remote.RemoteKeyInject.$Shape): remote.RemoteKeyInject & remote.RemoteKeyInject.$Shape;
        static create(properties?: remote.RemoteKeyInject.$Properties): remote.RemoteKeyInject;

        /**
         * Encodes the specified RemoteKeyInject message. Does not implicitly {@link remote.RemoteKeyInject.verify|verify} messages.
         * @param message RemoteKeyInject message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteKeyInject.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteKeyInject message, length delimited. Does not implicitly {@link remote.RemoteKeyInject.verify|verify} messages.
         * @param message RemoteKeyInject message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteKeyInject.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteKeyInject message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteKeyInject & remote.RemoteKeyInject.$Shape} RemoteKeyInject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteKeyInject & remote.RemoteKeyInject.$Shape;

        /**
         * Decodes a RemoteKeyInject message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteKeyInject & remote.RemoteKeyInject.$Shape} RemoteKeyInject
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteKeyInject & remote.RemoteKeyInject.$Shape;

        /**
         * Verifies a RemoteKeyInject message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteKeyInject message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteKeyInject
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteKeyInject;

        /**
         * Creates a plain object from a RemoteKeyInject message. Also converts values to other types if specified.
         * @param message RemoteKeyInject
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteKeyInject, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteKeyInject to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteKeyInject
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteKeyInject {

        /** Properties of a RemoteKeyInject. */
        interface $Properties {

            /** RemoteKeyInject keyCode */
            keyCode?: (remote.RemoteKeyCode|null);

            /** RemoteKeyInject direction */
            direction?: (remote.RemoteDirection|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteKeyInject. */
        type $Shape = remote.RemoteKeyInject.$Properties;
    }

    /**
     * Properties of a RemotePingResponse.
     * @deprecated Use remote.RemotePingResponse.$Properties instead.
     */
    interface IRemotePingResponse extends remote.RemotePingResponse.$Properties {
    }

    /** Represents a RemotePingResponse. */
    class RemotePingResponse {

        /**
         * Constructs a new RemotePingResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemotePingResponse.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemotePingResponse val1. */
        val1: number;

        /**
         * Creates a new RemotePingResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemotePingResponse instance
         */
        static create(properties: remote.RemotePingResponse.$Shape): remote.RemotePingResponse & remote.RemotePingResponse.$Shape;
        static create(properties?: remote.RemotePingResponse.$Properties): remote.RemotePingResponse;

        /**
         * Encodes the specified RemotePingResponse message. Does not implicitly {@link remote.RemotePingResponse.verify|verify} messages.
         * @param message RemotePingResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemotePingResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemotePingResponse message, length delimited. Does not implicitly {@link remote.RemotePingResponse.verify|verify} messages.
         * @param message RemotePingResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemotePingResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemotePingResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemotePingResponse & remote.RemotePingResponse.$Shape} RemotePingResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemotePingResponse & remote.RemotePingResponse.$Shape;

        /**
         * Decodes a RemotePingResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemotePingResponse & remote.RemotePingResponse.$Shape} RemotePingResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemotePingResponse & remote.RemotePingResponse.$Shape;

        /**
         * Verifies a RemotePingResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemotePingResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemotePingResponse
         */
        static fromObject(object: { [k: string]: any }): remote.RemotePingResponse;

        /**
         * Creates a plain object from a RemotePingResponse message. Also converts values to other types if specified.
         * @param message RemotePingResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemotePingResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemotePingResponse to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemotePingResponse
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemotePingResponse {

        /** Properties of a RemotePingResponse. */
        interface $Properties {

            /** RemotePingResponse val1 */
            val1?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemotePingResponse. */
        type $Shape = remote.RemotePingResponse.$Properties;
    }

    /**
     * Properties of a RemotePingRequest.
     * @deprecated Use remote.RemotePingRequest.$Properties instead.
     */
    interface IRemotePingRequest extends remote.RemotePingRequest.$Properties {
    }

    /** Represents a RemotePingRequest. */
    class RemotePingRequest {

        /**
         * Constructs a new RemotePingRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemotePingRequest.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemotePingRequest val1. */
        val1: number;

        /** RemotePingRequest val2. */
        val2: number;

        /**
         * Creates a new RemotePingRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemotePingRequest instance
         */
        static create(properties: remote.RemotePingRequest.$Shape): remote.RemotePingRequest & remote.RemotePingRequest.$Shape;
        static create(properties?: remote.RemotePingRequest.$Properties): remote.RemotePingRequest;

        /**
         * Encodes the specified RemotePingRequest message. Does not implicitly {@link remote.RemotePingRequest.verify|verify} messages.
         * @param message RemotePingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemotePingRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemotePingRequest message, length delimited. Does not implicitly {@link remote.RemotePingRequest.verify|verify} messages.
         * @param message RemotePingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemotePingRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemotePingRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemotePingRequest & remote.RemotePingRequest.$Shape} RemotePingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemotePingRequest & remote.RemotePingRequest.$Shape;

        /**
         * Decodes a RemotePingRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemotePingRequest & remote.RemotePingRequest.$Shape} RemotePingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemotePingRequest & remote.RemotePingRequest.$Shape;

        /**
         * Verifies a RemotePingRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemotePingRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemotePingRequest
         */
        static fromObject(object: { [k: string]: any }): remote.RemotePingRequest;

        /**
         * Creates a plain object from a RemotePingRequest message. Also converts values to other types if specified.
         * @param message RemotePingRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemotePingRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemotePingRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemotePingRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemotePingRequest {

        /** Properties of a RemotePingRequest. */
        interface $Properties {

            /** RemotePingRequest val1 */
            val1?: (number|null);

            /** RemotePingRequest val2 */
            val2?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemotePingRequest. */
        type $Shape = remote.RemotePingRequest.$Properties;
    }

    /**
     * Properties of a RemoteSetActive.
     * @deprecated Use remote.RemoteSetActive.$Properties instead.
     */
    interface IRemoteSetActive extends remote.RemoteSetActive.$Properties {
    }

    /** Represents a RemoteSetActive. */
    class RemoteSetActive {

        /**
         * Constructs a new RemoteSetActive.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteSetActive.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteSetActive active. */
        active: number;

        /**
         * Creates a new RemoteSetActive instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteSetActive instance
         */
        static create(properties: remote.RemoteSetActive.$Shape): remote.RemoteSetActive & remote.RemoteSetActive.$Shape;
        static create(properties?: remote.RemoteSetActive.$Properties): remote.RemoteSetActive;

        /**
         * Encodes the specified RemoteSetActive message. Does not implicitly {@link remote.RemoteSetActive.verify|verify} messages.
         * @param message RemoteSetActive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteSetActive.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteSetActive message, length delimited. Does not implicitly {@link remote.RemoteSetActive.verify|verify} messages.
         * @param message RemoteSetActive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteSetActive.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteSetActive message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteSetActive & remote.RemoteSetActive.$Shape} RemoteSetActive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteSetActive & remote.RemoteSetActive.$Shape;

        /**
         * Decodes a RemoteSetActive message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteSetActive & remote.RemoteSetActive.$Shape} RemoteSetActive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteSetActive & remote.RemoteSetActive.$Shape;

        /**
         * Verifies a RemoteSetActive message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteSetActive message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteSetActive
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteSetActive;

        /**
         * Creates a plain object from a RemoteSetActive message. Also converts values to other types if specified.
         * @param message RemoteSetActive
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteSetActive, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteSetActive to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteSetActive
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteSetActive {

        /** Properties of a RemoteSetActive. */
        interface $Properties {

            /** RemoteSetActive active */
            active?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteSetActive. */
        type $Shape = remote.RemoteSetActive.$Properties;
    }

    /**
     * Properties of a RemoteDeviceInfo.
     * @deprecated Use remote.RemoteDeviceInfo.$Properties instead.
     */
    interface IRemoteDeviceInfo extends remote.RemoteDeviceInfo.$Properties {
    }

    /** Represents a RemoteDeviceInfo. */
    class RemoteDeviceInfo {

        /**
         * Constructs a new RemoteDeviceInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteDeviceInfo.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteDeviceInfo model. */
        model: string;

        /** RemoteDeviceInfo vendor. */
        vendor: string;

        /** RemoteDeviceInfo unknown1. */
        unknown1: number;

        /** RemoteDeviceInfo unknown2. */
        unknown2: string;

        /** RemoteDeviceInfo packageName. */
        packageName: string;

        /** RemoteDeviceInfo appVersion. */
        appVersion: string;

        /**
         * Creates a new RemoteDeviceInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteDeviceInfo instance
         */
        static create(properties: remote.RemoteDeviceInfo.$Shape): remote.RemoteDeviceInfo & remote.RemoteDeviceInfo.$Shape;
        static create(properties?: remote.RemoteDeviceInfo.$Properties): remote.RemoteDeviceInfo;

        /**
         * Encodes the specified RemoteDeviceInfo message. Does not implicitly {@link remote.RemoteDeviceInfo.verify|verify} messages.
         * @param message RemoteDeviceInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteDeviceInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteDeviceInfo message, length delimited. Does not implicitly {@link remote.RemoteDeviceInfo.verify|verify} messages.
         * @param message RemoteDeviceInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteDeviceInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteDeviceInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteDeviceInfo & remote.RemoteDeviceInfo.$Shape} RemoteDeviceInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteDeviceInfo & remote.RemoteDeviceInfo.$Shape;

        /**
         * Decodes a RemoteDeviceInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteDeviceInfo & remote.RemoteDeviceInfo.$Shape} RemoteDeviceInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteDeviceInfo & remote.RemoteDeviceInfo.$Shape;

        /**
         * Verifies a RemoteDeviceInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteDeviceInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteDeviceInfo
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteDeviceInfo;

        /**
         * Creates a plain object from a RemoteDeviceInfo message. Also converts values to other types if specified.
         * @param message RemoteDeviceInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteDeviceInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteDeviceInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteDeviceInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteDeviceInfo {

        /** Properties of a RemoteDeviceInfo. */
        interface $Properties {

            /** RemoteDeviceInfo model */
            model?: (string|null);

            /** RemoteDeviceInfo vendor */
            vendor?: (string|null);

            /** RemoteDeviceInfo unknown1 */
            unknown1?: (number|null);

            /** RemoteDeviceInfo unknown2 */
            unknown2?: (string|null);

            /** RemoteDeviceInfo packageName */
            packageName?: (string|null);

            /** RemoteDeviceInfo appVersion */
            appVersion?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteDeviceInfo. */
        type $Shape = remote.RemoteDeviceInfo.$Properties;
    }

    /**
     * Properties of a RemoteConfigure.
     * @deprecated Use remote.RemoteConfigure.$Properties instead.
     */
    interface IRemoteConfigure extends remote.RemoteConfigure.$Properties {
    }

    /** Represents a RemoteConfigure. */
    class RemoteConfigure {

        /**
         * Constructs a new RemoteConfigure.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteConfigure.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteConfigure code1. */
        code1: number;

        /** RemoteConfigure deviceInfo. */
        deviceInfo?: (remote.RemoteDeviceInfo.$Properties|null);

        /**
         * Creates a new RemoteConfigure instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteConfigure instance
         */
        static create(properties: remote.RemoteConfigure.$Shape): remote.RemoteConfigure & remote.RemoteConfigure.$Shape;
        static create(properties?: remote.RemoteConfigure.$Properties): remote.RemoteConfigure;

        /**
         * Encodes the specified RemoteConfigure message. Does not implicitly {@link remote.RemoteConfigure.verify|verify} messages.
         * @param message RemoteConfigure message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteConfigure.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteConfigure message, length delimited. Does not implicitly {@link remote.RemoteConfigure.verify|verify} messages.
         * @param message RemoteConfigure message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteConfigure.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteConfigure message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteConfigure & remote.RemoteConfigure.$Shape} RemoteConfigure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteConfigure & remote.RemoteConfigure.$Shape;

        /**
         * Decodes a RemoteConfigure message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteConfigure & remote.RemoteConfigure.$Shape} RemoteConfigure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteConfigure & remote.RemoteConfigure.$Shape;

        /**
         * Verifies a RemoteConfigure message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteConfigure message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteConfigure
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteConfigure;

        /**
         * Creates a plain object from a RemoteConfigure message. Also converts values to other types if specified.
         * @param message RemoteConfigure
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteConfigure, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteConfigure to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteConfigure
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteConfigure {

        /** Properties of a RemoteConfigure. */
        interface $Properties {

            /** RemoteConfigure code1 */
            code1?: (number|null);

            /** RemoteConfigure deviceInfo */
            deviceInfo?: (remote.RemoteDeviceInfo.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteConfigure. */
        type $Shape = remote.RemoteConfigure.$Properties;
    }

    /**
     * Properties of a RemoteError.
     * @deprecated Use remote.RemoteError.$Properties instead.
     */
    interface IRemoteError extends remote.RemoteError.$Properties {
    }

    /** Represents a RemoteError. */
    class RemoteError {

        /**
         * Constructs a new RemoteError.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteError.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteError value. */
        value: boolean;

        /** RemoteError message. */
        message?: (remote.RemoteMessage.$Properties|null);

        /**
         * Creates a new RemoteError instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteError instance
         */
        static create(properties: remote.RemoteError.$Shape): remote.RemoteError & remote.RemoteError.$Shape;
        static create(properties?: remote.RemoteError.$Properties): remote.RemoteError;

        /**
         * Encodes the specified RemoteError message. Does not implicitly {@link remote.RemoteError.verify|verify} messages.
         * @param message RemoteError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteError.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteError message, length delimited. Does not implicitly {@link remote.RemoteError.verify|verify} messages.
         * @param message RemoteError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteError.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteError message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteError & remote.RemoteError.$Shape} RemoteError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteError & remote.RemoteError.$Shape;

        /**
         * Decodes a RemoteError message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteError & remote.RemoteError.$Shape} RemoteError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteError & remote.RemoteError.$Shape;

        /**
         * Verifies a RemoteError message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteError message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteError
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteError;

        /**
         * Creates a plain object from a RemoteError message. Also converts values to other types if specified.
         * @param message RemoteError
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteError, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteError to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteError
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteError {

        /** Properties of a RemoteError. */
        interface $Properties {

            /** RemoteError value */
            value?: (boolean|null);

            /** RemoteError message */
            message?: (remote.RemoteMessage.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteError. */
        type $Shape = remote.RemoteError.$Properties;
    }

    /**
     * Properties of a RemoteMessage.
     * @deprecated Use remote.RemoteMessage.$Properties instead.
     */
    interface IRemoteMessage extends remote.RemoteMessage.$Properties {
    }

    /** Represents a RemoteMessage. */
    class RemoteMessage {

        /**
         * Constructs a new RemoteMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: remote.RemoteMessage.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RemoteMessage remoteConfigure. */
        remoteConfigure?: (remote.RemoteConfigure.$Properties|null);

        /** RemoteMessage remoteSetActive. */
        remoteSetActive?: (remote.RemoteSetActive.$Properties|null);

        /** RemoteMessage remoteError. */
        remoteError?: (remote.RemoteError.$Properties|null);

        /** RemoteMessage remotePingRequest. */
        remotePingRequest?: (remote.RemotePingRequest.$Properties|null);

        /** RemoteMessage remotePingResponse. */
        remotePingResponse?: (remote.RemotePingResponse.$Properties|null);

        /** RemoteMessage remoteKeyInject. */
        remoteKeyInject?: (remote.RemoteKeyInject.$Properties|null);

        /** RemoteMessage remoteImeKeyInject. */
        remoteImeKeyInject?: (remote.RemoteImeKeyInject.$Properties|null);

        /** RemoteMessage remoteImeBatchEdit. */
        remoteImeBatchEdit?: (remote.RemoteImeBatchEdit.$Properties|null);

        /** RemoteMessage remoteImeShowRequest. */
        remoteImeShowRequest?: (remote.RemoteImeShowRequest.$Properties|null);

        /** RemoteMessage remoteVoiceBegin. */
        remoteVoiceBegin?: (remote.RemoteVoiceBegin.$Properties|null);

        /** RemoteMessage remoteVoicePayload. */
        remoteVoicePayload?: (remote.RemoteVoicePayload.$Properties|null);

        /** RemoteMessage remoteVoiceEnd. */
        remoteVoiceEnd?: (remote.RemoteVoiceEnd.$Properties|null);

        /** RemoteMessage remoteStart. */
        remoteStart?: (remote.RemoteStart.$Properties|null);

        /** RemoteMessage remoteSetVolumeLevel. */
        remoteSetVolumeLevel?: (remote.RemoteSetVolumeLevel.$Properties|null);

        /** RemoteMessage remoteAdjustVolumeLevel. */
        remoteAdjustVolumeLevel?: (remote.RemoteAdjustVolumeLevel.$Properties|null);

        /** RemoteMessage remoteSetPreferredAudioDevice. */
        remoteSetPreferredAudioDevice?: (remote.RemoteSetPreferredAudioDevice.$Properties|null);

        /** RemoteMessage remoteResetPreferredAudioDevice. */
        remoteResetPreferredAudioDevice?: (remote.RemoteResetPreferredAudioDevice.$Properties|null);

        /** RemoteMessage remoteAppLinkLaunchRequest. */
        remoteAppLinkLaunchRequest?: (remote.RemoteAppLinkLaunchRequest.$Properties|null);

        /**
         * Creates a new RemoteMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RemoteMessage instance
         */
        static create(properties: remote.RemoteMessage.$Shape): remote.RemoteMessage & remote.RemoteMessage.$Shape;
        static create(properties?: remote.RemoteMessage.$Properties): remote.RemoteMessage;

        /**
         * Encodes the specified RemoteMessage message. Does not implicitly {@link remote.RemoteMessage.verify|verify} messages.
         * @param message RemoteMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: remote.RemoteMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RemoteMessage message, length delimited. Does not implicitly {@link remote.RemoteMessage.verify|verify} messages.
         * @param message RemoteMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: remote.RemoteMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RemoteMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {remote.RemoteMessage & remote.RemoteMessage.$Shape} RemoteMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.RemoteMessage & remote.RemoteMessage.$Shape;

        /**
         * Decodes a RemoteMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {remote.RemoteMessage & remote.RemoteMessage.$Shape} RemoteMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.RemoteMessage & remote.RemoteMessage.$Shape;

        /**
         * Verifies a RemoteMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RemoteMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RemoteMessage
         */
        static fromObject(object: { [k: string]: any }): remote.RemoteMessage;

        /**
         * Creates a plain object from a RemoteMessage message. Also converts values to other types if specified.
         * @param message RemoteMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: remote.RemoteMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RemoteMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RemoteMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RemoteMessage {

        /** Properties of a RemoteMessage. */
        interface $Properties {

            /** RemoteMessage remoteConfigure */
            remoteConfigure?: (remote.RemoteConfigure.$Properties|null);

            /** RemoteMessage remoteSetActive */
            remoteSetActive?: (remote.RemoteSetActive.$Properties|null);

            /** RemoteMessage remoteError */
            remoteError?: (remote.RemoteError.$Properties|null);

            /** RemoteMessage remotePingRequest */
            remotePingRequest?: (remote.RemotePingRequest.$Properties|null);

            /** RemoteMessage remotePingResponse */
            remotePingResponse?: (remote.RemotePingResponse.$Properties|null);

            /** RemoteMessage remoteKeyInject */
            remoteKeyInject?: (remote.RemoteKeyInject.$Properties|null);

            /** RemoteMessage remoteImeKeyInject */
            remoteImeKeyInject?: (remote.RemoteImeKeyInject.$Properties|null);

            /** RemoteMessage remoteImeBatchEdit */
            remoteImeBatchEdit?: (remote.RemoteImeBatchEdit.$Properties|null);

            /** RemoteMessage remoteImeShowRequest */
            remoteImeShowRequest?: (remote.RemoteImeShowRequest.$Properties|null);

            /** RemoteMessage remoteVoiceBegin */
            remoteVoiceBegin?: (remote.RemoteVoiceBegin.$Properties|null);

            /** RemoteMessage remoteVoicePayload */
            remoteVoicePayload?: (remote.RemoteVoicePayload.$Properties|null);

            /** RemoteMessage remoteVoiceEnd */
            remoteVoiceEnd?: (remote.RemoteVoiceEnd.$Properties|null);

            /** RemoteMessage remoteStart */
            remoteStart?: (remote.RemoteStart.$Properties|null);

            /** RemoteMessage remoteSetVolumeLevel */
            remoteSetVolumeLevel?: (remote.RemoteSetVolumeLevel.$Properties|null);

            /** RemoteMessage remoteAdjustVolumeLevel */
            remoteAdjustVolumeLevel?: (remote.RemoteAdjustVolumeLevel.$Properties|null);

            /** RemoteMessage remoteSetPreferredAudioDevice */
            remoteSetPreferredAudioDevice?: (remote.RemoteSetPreferredAudioDevice.$Properties|null);

            /** RemoteMessage remoteResetPreferredAudioDevice */
            remoteResetPreferredAudioDevice?: (remote.RemoteResetPreferredAudioDevice.$Properties|null);

            /** RemoteMessage remoteAppLinkLaunchRequest */
            remoteAppLinkLaunchRequest?: (remote.RemoteAppLinkLaunchRequest.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RemoteMessage. */
        type $Shape = remote.RemoteMessage.$Properties;
    }

    /** RemoteKeyCode enum. */
    enum RemoteKeyCode {

        /** KEYCODE_UNKNOWN value */
        KEYCODE_UNKNOWN = 0,

        /** KEYCODE_SOFT_LEFT value */
        KEYCODE_SOFT_LEFT = 1,

        /** KEYCODE_SOFT_RIGHT value */
        KEYCODE_SOFT_RIGHT = 2,

        /** KEYCODE_HOME value */
        KEYCODE_HOME = 3,

        /** KEYCODE_BACK value */
        KEYCODE_BACK = 4,

        /** KEYCODE_CALL value */
        KEYCODE_CALL = 5,

        /** KEYCODE_ENDCALL value */
        KEYCODE_ENDCALL = 6,

        /** KEYCODE_0 value */
        KEYCODE_0 = 7,

        /** KEYCODE_1 value */
        KEYCODE_1 = 8,

        /** KEYCODE_2 value */
        KEYCODE_2 = 9,

        /** KEYCODE_3 value */
        KEYCODE_3 = 10,

        /** KEYCODE_4 value */
        KEYCODE_4 = 11,

        /** KEYCODE_5 value */
        KEYCODE_5 = 12,

        /** KEYCODE_6 value */
        KEYCODE_6 = 13,

        /** KEYCODE_7 value */
        KEYCODE_7 = 14,

        /** KEYCODE_8 value */
        KEYCODE_8 = 15,

        /** KEYCODE_9 value */
        KEYCODE_9 = 16,

        /** KEYCODE_STAR value */
        KEYCODE_STAR = 17,

        /** KEYCODE_POUND value */
        KEYCODE_POUND = 18,

        /** KEYCODE_DPAD_UP value */
        KEYCODE_DPAD_UP = 19,

        /** KEYCODE_DPAD_DOWN value */
        KEYCODE_DPAD_DOWN = 20,

        /** KEYCODE_DPAD_LEFT value */
        KEYCODE_DPAD_LEFT = 21,

        /** KEYCODE_DPAD_RIGHT value */
        KEYCODE_DPAD_RIGHT = 22,

        /** KEYCODE_DPAD_CENTER value */
        KEYCODE_DPAD_CENTER = 23,

        /** KEYCODE_VOLUME_UP value */
        KEYCODE_VOLUME_UP = 24,

        /** KEYCODE_VOLUME_DOWN value */
        KEYCODE_VOLUME_DOWN = 25,

        /** KEYCODE_POWER value */
        KEYCODE_POWER = 26,

        /** KEYCODE_CAMERA value */
        KEYCODE_CAMERA = 27,

        /** KEYCODE_CLEAR value */
        KEYCODE_CLEAR = 28,

        /** KEYCODE_A value */
        KEYCODE_A = 29,

        /** KEYCODE_B value */
        KEYCODE_B = 30,

        /** KEYCODE_C value */
        KEYCODE_C = 31,

        /** KEYCODE_D value */
        KEYCODE_D = 32,

        /** KEYCODE_E value */
        KEYCODE_E = 33,

        /** KEYCODE_F value */
        KEYCODE_F = 34,

        /** KEYCODE_G value */
        KEYCODE_G = 35,

        /** KEYCODE_H value */
        KEYCODE_H = 36,

        /** KEYCODE_I value */
        KEYCODE_I = 37,

        /** KEYCODE_J value */
        KEYCODE_J = 38,

        /** KEYCODE_K value */
        KEYCODE_K = 39,

        /** KEYCODE_L value */
        KEYCODE_L = 40,

        /** KEYCODE_M value */
        KEYCODE_M = 41,

        /** KEYCODE_N value */
        KEYCODE_N = 42,

        /** KEYCODE_O value */
        KEYCODE_O = 43,

        /** KEYCODE_P value */
        KEYCODE_P = 44,

        /** KEYCODE_Q value */
        KEYCODE_Q = 45,

        /** KEYCODE_R value */
        KEYCODE_R = 46,

        /** KEYCODE_S value */
        KEYCODE_S = 47,

        /** KEYCODE_T value */
        KEYCODE_T = 48,

        /** KEYCODE_U value */
        KEYCODE_U = 49,

        /** KEYCODE_V value */
        KEYCODE_V = 50,

        /** KEYCODE_W value */
        KEYCODE_W = 51,

        /** KEYCODE_X value */
        KEYCODE_X = 52,

        /** KEYCODE_Y value */
        KEYCODE_Y = 53,

        /** KEYCODE_Z value */
        KEYCODE_Z = 54,

        /** KEYCODE_COMMA value */
        KEYCODE_COMMA = 55,

        /** KEYCODE_PERIOD value */
        KEYCODE_PERIOD = 56,

        /** KEYCODE_ALT_LEFT value */
        KEYCODE_ALT_LEFT = 57,

        /** KEYCODE_ALT_RIGHT value */
        KEYCODE_ALT_RIGHT = 58,

        /** KEYCODE_SHIFT_LEFT value */
        KEYCODE_SHIFT_LEFT = 59,

        /** KEYCODE_SHIFT_RIGHT value */
        KEYCODE_SHIFT_RIGHT = 60,

        /** KEYCODE_TAB value */
        KEYCODE_TAB = 61,

        /** KEYCODE_SPACE value */
        KEYCODE_SPACE = 62,

        /** KEYCODE_SYM value */
        KEYCODE_SYM = 63,

        /** KEYCODE_EXPLORER value */
        KEYCODE_EXPLORER = 64,

        /** KEYCODE_ENVELOPE value */
        KEYCODE_ENVELOPE = 65,

        /** KEYCODE_ENTER value */
        KEYCODE_ENTER = 66,

        /** KEYCODE_DEL value */
        KEYCODE_DEL = 67,

        /** KEYCODE_GRAVE value */
        KEYCODE_GRAVE = 68,

        /** KEYCODE_MINUS value */
        KEYCODE_MINUS = 69,

        /** KEYCODE_EQUALS value */
        KEYCODE_EQUALS = 70,

        /** KEYCODE_LEFT_BRACKET value */
        KEYCODE_LEFT_BRACKET = 71,

        /** KEYCODE_RIGHT_BRACKET value */
        KEYCODE_RIGHT_BRACKET = 72,

        /** KEYCODE_BACKSLASH value */
        KEYCODE_BACKSLASH = 73,

        /** KEYCODE_SEMICOLON value */
        KEYCODE_SEMICOLON = 74,

        /** KEYCODE_APOSTROPHE value */
        KEYCODE_APOSTROPHE = 75,

        /** KEYCODE_SLASH value */
        KEYCODE_SLASH = 76,

        /** KEYCODE_AT value */
        KEYCODE_AT = 77,

        /** KEYCODE_NUM value */
        KEYCODE_NUM = 78,

        /** KEYCODE_HEADSETHOOK value */
        KEYCODE_HEADSETHOOK = 79,

        /** KEYCODE_FOCUS value */
        KEYCODE_FOCUS = 80,

        /** KEYCODE_PLUS value */
        KEYCODE_PLUS = 81,

        /** KEYCODE_MENU value */
        KEYCODE_MENU = 82,

        /** KEYCODE_NOTIFICATION value */
        KEYCODE_NOTIFICATION = 83,

        /** KEYCODE_SEARCH value */
        KEYCODE_SEARCH = 84,

        /** KEYCODE_MEDIA_PLAY_PAUSE value */
        KEYCODE_MEDIA_PLAY_PAUSE = 85,

        /** KEYCODE_MEDIA_STOP value */
        KEYCODE_MEDIA_STOP = 86,

        /** KEYCODE_MEDIA_NEXT value */
        KEYCODE_MEDIA_NEXT = 87,

        /** KEYCODE_MEDIA_PREVIOUS value */
        KEYCODE_MEDIA_PREVIOUS = 88,

        /** KEYCODE_MEDIA_REWIND value */
        KEYCODE_MEDIA_REWIND = 89,

        /** KEYCODE_MEDIA_FAST_FORWARD value */
        KEYCODE_MEDIA_FAST_FORWARD = 90,

        /** KEYCODE_MUTE value */
        KEYCODE_MUTE = 91,

        /** KEYCODE_PAGE_UP value */
        KEYCODE_PAGE_UP = 92,

        /** KEYCODE_PAGE_DOWN value */
        KEYCODE_PAGE_DOWN = 93,

        /** KEYCODE_PICTSYMBOLS value */
        KEYCODE_PICTSYMBOLS = 94,

        /** KEYCODE_SWITCH_CHARSET value */
        KEYCODE_SWITCH_CHARSET = 95,

        /** KEYCODE_BUTTON_A value */
        KEYCODE_BUTTON_A = 96,

        /** KEYCODE_BUTTON_B value */
        KEYCODE_BUTTON_B = 97,

        /** KEYCODE_BUTTON_C value */
        KEYCODE_BUTTON_C = 98,

        /** KEYCODE_BUTTON_X value */
        KEYCODE_BUTTON_X = 99,

        /** KEYCODE_BUTTON_Y value */
        KEYCODE_BUTTON_Y = 100,

        /** KEYCODE_BUTTON_Z value */
        KEYCODE_BUTTON_Z = 101,

        /** KEYCODE_BUTTON_L1 value */
        KEYCODE_BUTTON_L1 = 102,

        /** KEYCODE_BUTTON_R1 value */
        KEYCODE_BUTTON_R1 = 103,

        /** KEYCODE_BUTTON_L2 value */
        KEYCODE_BUTTON_L2 = 104,

        /** KEYCODE_BUTTON_R2 value */
        KEYCODE_BUTTON_R2 = 105,

        /** KEYCODE_BUTTON_THUMBL value */
        KEYCODE_BUTTON_THUMBL = 106,

        /** KEYCODE_BUTTON_THUMBR value */
        KEYCODE_BUTTON_THUMBR = 107,

        /** KEYCODE_BUTTON_START value */
        KEYCODE_BUTTON_START = 108,

        /** KEYCODE_BUTTON_SELECT value */
        KEYCODE_BUTTON_SELECT = 109,

        /** KEYCODE_BUTTON_MODE value */
        KEYCODE_BUTTON_MODE = 110,

        /** KEYCODE_ESCAPE value */
        KEYCODE_ESCAPE = 111,

        /** KEYCODE_FORWARD_DEL value */
        KEYCODE_FORWARD_DEL = 112,

        /** KEYCODE_CTRL_LEFT value */
        KEYCODE_CTRL_LEFT = 113,

        /** KEYCODE_CTRL_RIGHT value */
        KEYCODE_CTRL_RIGHT = 114,

        /** KEYCODE_CAPS_LOCK value */
        KEYCODE_CAPS_LOCK = 115,

        /** KEYCODE_SCROLL_LOCK value */
        KEYCODE_SCROLL_LOCK = 116,

        /** KEYCODE_META_LEFT value */
        KEYCODE_META_LEFT = 117,

        /** KEYCODE_META_RIGHT value */
        KEYCODE_META_RIGHT = 118,

        /** KEYCODE_FUNCTION value */
        KEYCODE_FUNCTION = 119,

        /** KEYCODE_SYSRQ value */
        KEYCODE_SYSRQ = 120,

        /** KEYCODE_BREAK value */
        KEYCODE_BREAK = 121,

        /** KEYCODE_MOVE_HOME value */
        KEYCODE_MOVE_HOME = 122,

        /** KEYCODE_MOVE_END value */
        KEYCODE_MOVE_END = 123,

        /** KEYCODE_INSERT value */
        KEYCODE_INSERT = 124,

        /** KEYCODE_FORWARD value */
        KEYCODE_FORWARD = 125,

        /** KEYCODE_MEDIA_PLAY value */
        KEYCODE_MEDIA_PLAY = 126,

        /** KEYCODE_MEDIA_PAUSE value */
        KEYCODE_MEDIA_PAUSE = 127,

        /** KEYCODE_MEDIA_CLOSE value */
        KEYCODE_MEDIA_CLOSE = 128,

        /** KEYCODE_MEDIA_EJECT value */
        KEYCODE_MEDIA_EJECT = 129,

        /** KEYCODE_MEDIA_RECORD value */
        KEYCODE_MEDIA_RECORD = 130,

        /** KEYCODE_F1 value */
        KEYCODE_F1 = 131,

        /** KEYCODE_F2 value */
        KEYCODE_F2 = 132,

        /** KEYCODE_F3 value */
        KEYCODE_F3 = 133,

        /** KEYCODE_F4 value */
        KEYCODE_F4 = 134,

        /** KEYCODE_F5 value */
        KEYCODE_F5 = 135,

        /** KEYCODE_F6 value */
        KEYCODE_F6 = 136,

        /** KEYCODE_F7 value */
        KEYCODE_F7 = 137,

        /** KEYCODE_F8 value */
        KEYCODE_F8 = 138,

        /** KEYCODE_F9 value */
        KEYCODE_F9 = 139,

        /** KEYCODE_F10 value */
        KEYCODE_F10 = 140,

        /** KEYCODE_F11 value */
        KEYCODE_F11 = 141,

        /** KEYCODE_F12 value */
        KEYCODE_F12 = 142,

        /** KEYCODE_NUM_LOCK value */
        KEYCODE_NUM_LOCK = 143,

        /** KEYCODE_NUMPAD_0 value */
        KEYCODE_NUMPAD_0 = 144,

        /** KEYCODE_NUMPAD_1 value */
        KEYCODE_NUMPAD_1 = 145,

        /** KEYCODE_NUMPAD_2 value */
        KEYCODE_NUMPAD_2 = 146,

        /** KEYCODE_NUMPAD_3 value */
        KEYCODE_NUMPAD_3 = 147,

        /** KEYCODE_NUMPAD_4 value */
        KEYCODE_NUMPAD_4 = 148,

        /** KEYCODE_NUMPAD_5 value */
        KEYCODE_NUMPAD_5 = 149,

        /** KEYCODE_NUMPAD_6 value */
        KEYCODE_NUMPAD_6 = 150,

        /** KEYCODE_NUMPAD_7 value */
        KEYCODE_NUMPAD_7 = 151,

        /** KEYCODE_NUMPAD_8 value */
        KEYCODE_NUMPAD_8 = 152,

        /** KEYCODE_NUMPAD_9 value */
        KEYCODE_NUMPAD_9 = 153,

        /** KEYCODE_NUMPAD_DIVIDE value */
        KEYCODE_NUMPAD_DIVIDE = 154,

        /** KEYCODE_NUMPAD_MULTIPLY value */
        KEYCODE_NUMPAD_MULTIPLY = 155,

        /** KEYCODE_NUMPAD_SUBTRACT value */
        KEYCODE_NUMPAD_SUBTRACT = 156,

        /** KEYCODE_NUMPAD_ADD value */
        KEYCODE_NUMPAD_ADD = 157,

        /** KEYCODE_NUMPAD_DOT value */
        KEYCODE_NUMPAD_DOT = 158,

        /** KEYCODE_NUMPAD_COMMA value */
        KEYCODE_NUMPAD_COMMA = 159,

        /** KEYCODE_NUMPAD_ENTER value */
        KEYCODE_NUMPAD_ENTER = 160,

        /** KEYCODE_NUMPAD_EQUALS value */
        KEYCODE_NUMPAD_EQUALS = 161,

        /** KEYCODE_NUMPAD_LEFT_PAREN value */
        KEYCODE_NUMPAD_LEFT_PAREN = 162,

        /** KEYCODE_NUMPAD_RIGHT_PAREN value */
        KEYCODE_NUMPAD_RIGHT_PAREN = 163,

        /** KEYCODE_VOLUME_MUTE value */
        KEYCODE_VOLUME_MUTE = 164,

        /** KEYCODE_INFO value */
        KEYCODE_INFO = 165,

        /** KEYCODE_CHANNEL_UP value */
        KEYCODE_CHANNEL_UP = 166,

        /** KEYCODE_CHANNEL_DOWN value */
        KEYCODE_CHANNEL_DOWN = 167,

        /** KEYCODE_ZOOM_IN value */
        KEYCODE_ZOOM_IN = 168,

        /** KEYCODE_ZOOM_OUT value */
        KEYCODE_ZOOM_OUT = 169,

        /** KEYCODE_TV value */
        KEYCODE_TV = 170,

        /** KEYCODE_WINDOW value */
        KEYCODE_WINDOW = 171,

        /** KEYCODE_GUIDE value */
        KEYCODE_GUIDE = 172,

        /** KEYCODE_DVR value */
        KEYCODE_DVR = 173,

        /** KEYCODE_BOOKMARK value */
        KEYCODE_BOOKMARK = 174,

        /** KEYCODE_CAPTIONS value */
        KEYCODE_CAPTIONS = 175,

        /** KEYCODE_SETTINGS value */
        KEYCODE_SETTINGS = 176,

        /** KEYCODE_TV_POWER value */
        KEYCODE_TV_POWER = 177,

        /** KEYCODE_TV_INPUT value */
        KEYCODE_TV_INPUT = 178,

        /** KEYCODE_STB_POWER value */
        KEYCODE_STB_POWER = 179,

        /** KEYCODE_STB_INPUT value */
        KEYCODE_STB_INPUT = 180,

        /** KEYCODE_AVR_POWER value */
        KEYCODE_AVR_POWER = 181,

        /** KEYCODE_AVR_INPUT value */
        KEYCODE_AVR_INPUT = 182,

        /** KEYCODE_PROG_RED value */
        KEYCODE_PROG_RED = 183,

        /** KEYCODE_PROG_GREEN value */
        KEYCODE_PROG_GREEN = 184,

        /** KEYCODE_PROG_YELLOW value */
        KEYCODE_PROG_YELLOW = 185,

        /** KEYCODE_PROG_BLUE value */
        KEYCODE_PROG_BLUE = 186,

        /** KEYCODE_APP_SWITCH value */
        KEYCODE_APP_SWITCH = 187,

        /** KEYCODE_BUTTON_1 value */
        KEYCODE_BUTTON_1 = 188,

        /** KEYCODE_BUTTON_2 value */
        KEYCODE_BUTTON_2 = 189,

        /** KEYCODE_BUTTON_3 value */
        KEYCODE_BUTTON_3 = 190,

        /** KEYCODE_BUTTON_4 value */
        KEYCODE_BUTTON_4 = 191,

        /** KEYCODE_BUTTON_5 value */
        KEYCODE_BUTTON_5 = 192,

        /** KEYCODE_BUTTON_6 value */
        KEYCODE_BUTTON_6 = 193,

        /** KEYCODE_BUTTON_7 value */
        KEYCODE_BUTTON_7 = 194,

        /** KEYCODE_BUTTON_8 value */
        KEYCODE_BUTTON_8 = 195,

        /** KEYCODE_BUTTON_9 value */
        KEYCODE_BUTTON_9 = 196,

        /** KEYCODE_BUTTON_10 value */
        KEYCODE_BUTTON_10 = 197,

        /** KEYCODE_BUTTON_11 value */
        KEYCODE_BUTTON_11 = 198,

        /** KEYCODE_BUTTON_12 value */
        KEYCODE_BUTTON_12 = 199,

        /** KEYCODE_BUTTON_13 value */
        KEYCODE_BUTTON_13 = 200,

        /** KEYCODE_BUTTON_14 value */
        KEYCODE_BUTTON_14 = 201,

        /** KEYCODE_BUTTON_15 value */
        KEYCODE_BUTTON_15 = 202,

        /** KEYCODE_BUTTON_16 value */
        KEYCODE_BUTTON_16 = 203,

        /** KEYCODE_LANGUAGE_SWITCH value */
        KEYCODE_LANGUAGE_SWITCH = 204,

        /** KEYCODE_MANNER_MODE value */
        KEYCODE_MANNER_MODE = 205,

        /** KEYCODE_3D_MODE value */
        KEYCODE_3D_MODE = 206,

        /** KEYCODE_CONTACTS value */
        KEYCODE_CONTACTS = 207,

        /** KEYCODE_CALENDAR value */
        KEYCODE_CALENDAR = 208,

        /** KEYCODE_MUSIC value */
        KEYCODE_MUSIC = 209,

        /** KEYCODE_CALCULATOR value */
        KEYCODE_CALCULATOR = 210,

        /** KEYCODE_ZENKAKU_HANKAKU value */
        KEYCODE_ZENKAKU_HANKAKU = 211,

        /** KEYCODE_EISU value */
        KEYCODE_EISU = 212,

        /** KEYCODE_MUHENKAN value */
        KEYCODE_MUHENKAN = 213,

        /** KEYCODE_HENKAN value */
        KEYCODE_HENKAN = 214,

        /** KEYCODE_KATAKANA_HIRAGANA value */
        KEYCODE_KATAKANA_HIRAGANA = 215,

        /** KEYCODE_YEN value */
        KEYCODE_YEN = 216,

        /** KEYCODE_RO value */
        KEYCODE_RO = 217,

        /** KEYCODE_KANA value */
        KEYCODE_KANA = 218,

        /** KEYCODE_ASSIST value */
        KEYCODE_ASSIST = 219,

        /** KEYCODE_BRIGHTNESS_DOWN value */
        KEYCODE_BRIGHTNESS_DOWN = 220,

        /** KEYCODE_BRIGHTNESS_UP value */
        KEYCODE_BRIGHTNESS_UP = 221,

        /** KEYCODE_MEDIA_AUDIO_TRACK value */
        KEYCODE_MEDIA_AUDIO_TRACK = 222,

        /** KEYCODE_SLEEP value */
        KEYCODE_SLEEP = 223,

        /** KEYCODE_WAKEUP value */
        KEYCODE_WAKEUP = 224,

        /** KEYCODE_PAIRING value */
        KEYCODE_PAIRING = 225,

        /** KEYCODE_MEDIA_TOP_MENU value */
        KEYCODE_MEDIA_TOP_MENU = 226,

        /** KEYCODE_11 value */
        KEYCODE_11 = 227,

        /** KEYCODE_12 value */
        KEYCODE_12 = 228,

        /** KEYCODE_LAST_CHANNEL value */
        KEYCODE_LAST_CHANNEL = 229,

        /** KEYCODE_TV_DATA_SERVICE value */
        KEYCODE_TV_DATA_SERVICE = 230,

        /** KEYCODE_VOICE_ASSIST value */
        KEYCODE_VOICE_ASSIST = 231,

        /** KEYCODE_TV_RADIO value */
        KEYCODE_TV_RADIO = 232,

        /** KEYCODE_TV_TELETEXT value */
        KEYCODE_TV_TELETEXT = 233,

        /** KEYCODE_TV_NUMBER_ENTRY value */
        KEYCODE_TV_NUMBER_ENTRY = 234,

        /** KEYCODE_TV_TERRESTRIAL_ANALOG value */
        KEYCODE_TV_TERRESTRIAL_ANALOG = 235,

        /** KEYCODE_TV_TERRESTRIAL_DIGITAL value */
        KEYCODE_TV_TERRESTRIAL_DIGITAL = 236,

        /** KEYCODE_TV_SATELLITE value */
        KEYCODE_TV_SATELLITE = 237,

        /** KEYCODE_TV_SATELLITE_BS value */
        KEYCODE_TV_SATELLITE_BS = 238,

        /** KEYCODE_TV_SATELLITE_CS value */
        KEYCODE_TV_SATELLITE_CS = 239,

        /** KEYCODE_TV_SATELLITE_SERVICE value */
        KEYCODE_TV_SATELLITE_SERVICE = 240,

        /** KEYCODE_TV_NETWORK value */
        KEYCODE_TV_NETWORK = 241,

        /** KEYCODE_TV_ANTENNA_CABLE value */
        KEYCODE_TV_ANTENNA_CABLE = 242,

        /** KEYCODE_TV_INPUT_HDMI_1 value */
        KEYCODE_TV_INPUT_HDMI_1 = 243,

        /** KEYCODE_TV_INPUT_HDMI_2 value */
        KEYCODE_TV_INPUT_HDMI_2 = 244,

        /** KEYCODE_TV_INPUT_HDMI_3 value */
        KEYCODE_TV_INPUT_HDMI_3 = 245,

        /** KEYCODE_TV_INPUT_HDMI_4 value */
        KEYCODE_TV_INPUT_HDMI_4 = 246,

        /** KEYCODE_TV_INPUT_COMPOSITE_1 value */
        KEYCODE_TV_INPUT_COMPOSITE_1 = 247,

        /** KEYCODE_TV_INPUT_COMPOSITE_2 value */
        KEYCODE_TV_INPUT_COMPOSITE_2 = 248,

        /** KEYCODE_TV_INPUT_COMPONENT_1 value */
        KEYCODE_TV_INPUT_COMPONENT_1 = 249,

        /** KEYCODE_TV_INPUT_COMPONENT_2 value */
        KEYCODE_TV_INPUT_COMPONENT_2 = 250,

        /** KEYCODE_TV_INPUT_VGA_1 value */
        KEYCODE_TV_INPUT_VGA_1 = 251,

        /** KEYCODE_TV_AUDIO_DESCRIPTION value */
        KEYCODE_TV_AUDIO_DESCRIPTION = 252,

        /** KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP value */
        KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP = 253,

        /** KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN value */
        KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN = 254,

        /** KEYCODE_TV_ZOOM_MODE value */
        KEYCODE_TV_ZOOM_MODE = 255,

        /** KEYCODE_TV_CONTENTS_MENU value */
        KEYCODE_TV_CONTENTS_MENU = 256,

        /** KEYCODE_TV_MEDIA_CONTEXT_MENU value */
        KEYCODE_TV_MEDIA_CONTEXT_MENU = 257,

        /** KEYCODE_TV_TIMER_PROGRAMMING value */
        KEYCODE_TV_TIMER_PROGRAMMING = 258,

        /** KEYCODE_HELP value */
        KEYCODE_HELP = 259,

        /** KEYCODE_NAVIGATE_PREVIOUS value */
        KEYCODE_NAVIGATE_PREVIOUS = 260,

        /** KEYCODE_NAVIGATE_NEXT value */
        KEYCODE_NAVIGATE_NEXT = 261,

        /** KEYCODE_NAVIGATE_IN value */
        KEYCODE_NAVIGATE_IN = 262,

        /** KEYCODE_NAVIGATE_OUT value */
        KEYCODE_NAVIGATE_OUT = 263,

        /** KEYCODE_STEM_PRIMARY value */
        KEYCODE_STEM_PRIMARY = 264,

        /** KEYCODE_STEM_1 value */
        KEYCODE_STEM_1 = 265,

        /** KEYCODE_STEM_2 value */
        KEYCODE_STEM_2 = 266,

        /** KEYCODE_STEM_3 value */
        KEYCODE_STEM_3 = 267,

        /** KEYCODE_DPAD_UP_LEFT value */
        KEYCODE_DPAD_UP_LEFT = 268,

        /** KEYCODE_DPAD_DOWN_LEFT value */
        KEYCODE_DPAD_DOWN_LEFT = 269,

        /** KEYCODE_DPAD_UP_RIGHT value */
        KEYCODE_DPAD_UP_RIGHT = 270,

        /** KEYCODE_DPAD_DOWN_RIGHT value */
        KEYCODE_DPAD_DOWN_RIGHT = 271,

        /** KEYCODE_MEDIA_SKIP_FORWARD value */
        KEYCODE_MEDIA_SKIP_FORWARD = 272,

        /** KEYCODE_MEDIA_SKIP_BACKWARD value */
        KEYCODE_MEDIA_SKIP_BACKWARD = 273,

        /** KEYCODE_MEDIA_STEP_FORWARD value */
        KEYCODE_MEDIA_STEP_FORWARD = 274,

        /** KEYCODE_MEDIA_STEP_BACKWARD value */
        KEYCODE_MEDIA_STEP_BACKWARD = 275,

        /** KEYCODE_SOFT_SLEEP value */
        KEYCODE_SOFT_SLEEP = 276,

        /** KEYCODE_CUT value */
        KEYCODE_CUT = 277,

        /** KEYCODE_COPY value */
        KEYCODE_COPY = 278,

        /** KEYCODE_PASTE value */
        KEYCODE_PASTE = 279,

        /** KEYCODE_SYSTEM_NAVIGATION_UP value */
        KEYCODE_SYSTEM_NAVIGATION_UP = 280,

        /** KEYCODE_SYSTEM_NAVIGATION_DOWN value */
        KEYCODE_SYSTEM_NAVIGATION_DOWN = 281,

        /** KEYCODE_SYSTEM_NAVIGATION_LEFT value */
        KEYCODE_SYSTEM_NAVIGATION_LEFT = 282,

        /** KEYCODE_SYSTEM_NAVIGATION_RIGHT value */
        KEYCODE_SYSTEM_NAVIGATION_RIGHT = 283,

        /** KEYCODE_ALL_APPS value */
        KEYCODE_ALL_APPS = 284,

        /** KEYCODE_REFRESH value */
        KEYCODE_REFRESH = 285,

        /** KEYCODE_THUMBS_UP value */
        KEYCODE_THUMBS_UP = 286,

        /** KEYCODE_THUMBS_DOWN value */
        KEYCODE_THUMBS_DOWN = 287,

        /** KEYCODE_PROFILE_SWITCH value */
        KEYCODE_PROFILE_SWITCH = 288,

        /** KEYCODE_VIDEO_APP_1 value */
        KEYCODE_VIDEO_APP_1 = 289,

        /** KEYCODE_VIDEO_APP_2 value */
        KEYCODE_VIDEO_APP_2 = 290,

        /** KEYCODE_VIDEO_APP_3 value */
        KEYCODE_VIDEO_APP_3 = 291,

        /** KEYCODE_VIDEO_APP_4 value */
        KEYCODE_VIDEO_APP_4 = 292,

        /** KEYCODE_VIDEO_APP_5 value */
        KEYCODE_VIDEO_APP_5 = 293,

        /** KEYCODE_VIDEO_APP_6 value */
        KEYCODE_VIDEO_APP_6 = 294,

        /** KEYCODE_VIDEO_APP_7 value */
        KEYCODE_VIDEO_APP_7 = 295,

        /** KEYCODE_VIDEO_APP_8 value */
        KEYCODE_VIDEO_APP_8 = 296,

        /** KEYCODE_FEATURED_APP_1 value */
        KEYCODE_FEATURED_APP_1 = 297,

        /** KEYCODE_FEATURED_APP_2 value */
        KEYCODE_FEATURED_APP_2 = 298,

        /** KEYCODE_FEATURED_APP_3 value */
        KEYCODE_FEATURED_APP_3 = 299,

        /** KEYCODE_FEATURED_APP_4 value */
        KEYCODE_FEATURED_APP_4 = 300,

        /** KEYCODE_DEMO_APP_1 value */
        KEYCODE_DEMO_APP_1 = 301,

        /** KEYCODE_DEMO_APP_2 value */
        KEYCODE_DEMO_APP_2 = 302,

        /** KEYCODE_DEMO_APP_3 value */
        KEYCODE_DEMO_APP_3 = 303,

        /** KEYCODE_DEMO_APP_4 value */
        KEYCODE_DEMO_APP_4 = 304
    }
}

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

        /** PairingMessage protocolVersion. */
        protocolVersion: number;

        /** PairingMessage status. */
        status: pairing.Status;

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

            /** PairingMessage protocolVersion */
            protocolVersion?: (number|null);

            /** PairingMessage status */
            status?: (pairing.Status|null);

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
