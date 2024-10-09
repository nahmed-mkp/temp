export interface IIndicativeRequest {
    portfolioId?: number;
    portfolioGuid?: string;
    cusips?: string[];
    blbgNames?: string[];
    useMapFields?: boolean;
    explodeMega?: boolean;

    seperateRequest?: boolean;
}
