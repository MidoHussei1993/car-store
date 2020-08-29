export class Car{
        _id: string;
        mark: Mark
        license: Date;
        kilometerStand: number;
        co2: number;
        price: number;
        door: number;
        seats: number;
        cylindree: number;
        consumOut: number;
        consumIn: number;
        consumMixed: number;
        pollutionCat: number;
        model: string;
        power: string;
        color: string;
        description: string;
        drive: boolean;
        type: boolean;
        fuel: boolean;
        blutooth: boolean;
        metallic: boolean;
        frontSidAirbag: boolean;
        navigationSystem: boolean;
        airCondition: boolean;
        elecWindow: boolean;
        heatedSeat: boolean;
        tractionControl: boolean; //التحكم في الجر
        parkingAssistance: boolean;
        frontParkingAssistance: boolean;
        speedRegulator: boolean;
        rainSensor: boolean;
        led: number;
        LEDdaytime: boolean;
        LEDHeadlights: boolean;
        corneringLight: boolean;
        fogLights: boolean;
        powerSteering: boolean;
        multifunctionSteeringWheel: boolean;
        alloywheels: boolean;
        centerArmrest: boolean;
        serviceBook: boolean;
        sportPack: boolean;
        handsfree: boolean;
        sunroof: boolean;
        roofRack: boolean;
        alarm: boolean;
        boardComputer: boolean;
        leather: boolean;
        isofix: boolean;
        ESP: boolean;
        abs: boolean;
        musicPlayer: boolean;
        sportShassis: boolean;
        sportsSeats: boolean;
        voiceCommand: boolean;
        immobilizerSystem: boolean;
        carImages: string[];
        mainImage: string;
        createdAt:Date;
}
export class Mark{
        _id:string;
        name:string;
}