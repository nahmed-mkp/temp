import { Action } from '@ngrx/store';

import * as fromModels from '../../models/bidlist-parser.models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum BidlistParserActionTypes {

    LOAD_EXPRESSIONS = '[BidlistParser] Load expressions',
    LOAD_EXPRESSIONS_COMPLETE = '[BidlistParser] Load expressions complete',
    LOAD_EXPRESSIONS_FAILED = '[BidlistParser] Load expressions failed',

    PARSE_USER_INPUT = '[BidlistParser] Parse user input',
    PARSE_USER_INPUT_COMPLETE = '[BidlistParser] Parse user input complete',
    PARSE_USER_INPUT_FAILED = '[BidlistParser] Parse user input failed'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */


export class LoadBidlistParserExpressions implements Action {
    readonly type = BidlistParserActionTypes.LOAD_EXPRESSIONS;
}

export class LoadBidlistParserExpressionsComplete implements Action {
    readonly type = BidlistParserActionTypes.LOAD_EXPRESSIONS_COMPLETE;

    constructor(public payload: fromModels.IBidlistParserExpression[]) { }
}

export class LoadBidlistParserExpressionsFailed implements Action {
    readonly type = BidlistParserActionTypes.LOAD_EXPRESSIONS_FAILED;

    constructor(public payload: string) { }
}

export class ParseUserInput implements Action {
    readonly type = BidlistParserActionTypes.PARSE_USER_INPUT;

    constructor(public payload: fromModels.IBidlistParserRequest) { }
}

export class ParseUserInputComplete implements Action {
    readonly type = BidlistParserActionTypes.PARSE_USER_INPUT_COMPLETE;

    constructor(public payload: fromModels.IBidlistParserResult[]) { }
}

export class ParseUserInputFailed implements Action {
    readonly type = BidlistParserActionTypes.PARSE_USER_INPUT_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type BidlistParserActions
    = LoadBidlistParserExpressions
    | LoadBidlistParserExpressionsComplete
    | LoadBidlistParserExpressionsFailed

    | ParseUserInput
    | ParseUserInputComplete
    | ParseUserInputFailed;


