

import { createAction } from 'redux-actions';
import {
    REQUEST_GET_INDICATORTYPE, REQUEST_SAVE_INDICATORTYPE, REQUEST_UPDATE_INDICATORTYPE, REQUEST_DELETE_INDICATORTYPE,
    REQUEST_GET_DESCRIPTION, REQUEST_SAVE_DESCRIPTION, REQUEST_UPDATE_DESCRIPTION, REQUEST_DELETE_DESCRIPTION,
    REQUEST_GET_INDICATORMAPPING, REQUEST_SAVE_INDICATORMAPPING, REQUEST_UPDATE_INDICATORMAPPING, REQUEST_DELETE_INDICATORMAPPING,
    REQUEST_GET_INDICATOR, REQUEST_SAVE_INDICATOR, REQUEST_UPDATE_INDICATOR, REQUEST_DELETE_INDICATOR,
    REQUEST_GET_PROFILER, REQUEST_SAVE_PROFILER, REQUEST_UPDATE_PROFILER, REQUEST_DELETE_PROFILER,
   SUCCESS_GET_INDICATORTYPE, SUCCESS_SAVE_INDICATORTYPE, SUCCESS_UPDATE_INDICATORTYPE, SUCCESS_DELETE_INDICATORTYPE,
   SUCCESS_GET_DESCRIPTION, SUCCESS_SAVE_DESCRIPTION, SUCCESS_UPDATE_DESCRIPTION, SUCCESS_DELETE_DESCRIPTION,
   SUCCESS_GET_INDICATORMAPPING, SUCCESS_SAVE_INDICATORMAPPING, SUCCESS_UPDATE_INDICATORMAPPING, SUCCESS_DELETE_INDICATORMAPPING,
   SUCCESS_GET_INDICATOR, SUCCESS_SAVE_INDICATOR, SUCCESS_UPDATE_INDICATOR, SUCCESS_DELETE_INDICATOR,
   SUCCESS_GET_PROFILER, SUCCESS_SAVE_PROFILER, SUCCESS_UPDATE_PROFILER, SUCCESS_DELETE_PROFILER,
   REQUEST_GET_PROFILERSUMMARY,SUCCESS_GET_PROFILERSUMMARY,
} from "./constants"


export const requestGetIndicatorType = createAction(REQUEST_GET_INDICATORTYPE);
export const successGetIndicatorType = createAction(SUCCESS_GET_INDICATORTYPE);
export const requestSaveIndicatorType = createAction(REQUEST_SAVE_INDICATORTYPE);
export const successSaveIndicatorType = createAction(SUCCESS_SAVE_INDICATORTYPE);
export const requestUpdateIndicatorType = createAction(REQUEST_UPDATE_INDICATORTYPE);
export const successUpdateIndicatorType = createAction(SUCCESS_UPDATE_INDICATORTYPE);
export const requestDeleteIndicatorType = createAction(REQUEST_DELETE_INDICATORTYPE);
export const successDeleteIndicatorType = createAction(SUCCESS_DELETE_INDICATORTYPE);

export const requestGetIndicator = createAction(REQUEST_GET_INDICATOR);
export const successGetIndicator = createAction(SUCCESS_GET_INDICATOR);
export const requestSaveIndicator = createAction(REQUEST_SAVE_INDICATOR);
export const successSaveIndicator = createAction(SUCCESS_SAVE_INDICATOR);
export const requestUpdateIndicator = createAction(REQUEST_UPDATE_INDICATOR);
export const successUpdateIndicator = createAction(SUCCESS_UPDATE_INDICATOR);
export const requestDeleteIndicator = createAction(REQUEST_DELETE_INDICATOR);
export const successDeleteIndicator = createAction(SUCCESS_DELETE_INDICATOR);

export const requestGetProfilerSummary = createAction(REQUEST_GET_PROFILERSUMMARY);
export const successGetProfilerSummary = createAction(SUCCESS_GET_PROFILERSUMMARY);
export const requestGetProfiler = createAction(REQUEST_GET_PROFILER);
export const successGetProfiler = createAction(SUCCESS_GET_PROFILER);
export const requestSaveProfiler = createAction(REQUEST_SAVE_PROFILER);
export const successSaveProfiler = createAction(SUCCESS_SAVE_PROFILER);
export const requestUpdateProfiler = createAction(REQUEST_UPDATE_PROFILER);
export const successUpdateProfiler = createAction(SUCCESS_UPDATE_PROFILER);
export const requestDeleteProfiler = createAction(REQUEST_DELETE_PROFILER);
export const successDeleteProfiler = createAction(SUCCESS_DELETE_PROFILER);

export const requestGetIndicatorMapping = createAction(REQUEST_GET_INDICATORMAPPING);
export const successGetIndicatorMapping = createAction(SUCCESS_GET_INDICATORMAPPING);
export const requestSaveIndicatorMapping = createAction(REQUEST_SAVE_INDICATORMAPPING);
export const successSaveIndicatorMapping = createAction(SUCCESS_SAVE_INDICATORMAPPING);
export const requestUpdateIndicatorMapping = createAction(REQUEST_UPDATE_INDICATORMAPPING);
export const successUpdateIndicatorMapping = createAction(SUCCESS_UPDATE_INDICATORMAPPING);
export const requestDeleteIndicatorMapping = createAction(REQUEST_DELETE_INDICATORMAPPING);
export const successDeleteIndicatorMapping = createAction(SUCCESS_DELETE_INDICATORMAPPING);


export const requestGetDescription = createAction(REQUEST_GET_DESCRIPTION);
export const successGetDescription = createAction(SUCCESS_GET_DESCRIPTION);
export const requestSaveDescription = createAction(REQUEST_SAVE_DESCRIPTION);
export const successSaveDescription = createAction(SUCCESS_SAVE_DESCRIPTION);
export const requestUpdateDescription = createAction(REQUEST_UPDATE_DESCRIPTION);
export const successUpdateDescription = createAction(SUCCESS_UPDATE_DESCRIPTION);
export const requestDeleteDescription = createAction(REQUEST_DELETE_DESCRIPTION);
export const successDeleteDescription = createAction(SUCCESS_DELETE_DESCRIPTION);

