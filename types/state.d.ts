export declare enum FUNCTIONNAMES {
    doWeHaveConsent = 0,
    getAllConsents = 1
}
export declare enum CONSENTNAMES {
    fullconsent = "fullconsent",
    iab = "iab",
    marketing = "marketing",
    preferences = "preferences",
    statistics = "statistics"
}
export declare enum CONSENTTEXTS {
    fullconsent = "Tillad alle",
    iab = "Tillad alle",
    marketing = "Marketing",
    preferences = "Pr\u00E6ferencer",
    statistics = "Statistik"
}
declare function setupDone(): void;
declare function isReady(callback: () => void): void;
export declare const CONSENTSTATE: {
    hasFullIABConsent: boolean;
    isReady: typeof isReady;
    list: any[];
    ready: boolean;
    setupDone: typeof setupDone;
};
export {};
