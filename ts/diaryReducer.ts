import { v4 as uuidv4 } from 'uuid';

export type entryType = {
	id: number;
	text: string;
	time: string;
	changed: boolean;
	timeOfChange: null | string;
};

export enum DiaryActionType {
    NEW_CHANGE_TEXT = 'NEW_CHANGE_TEXT',
    SUBMIT_NEW = 'SUBMIT_NEW',
    EDITING_CHANGE_TEXT = 'EDITING_CHANGE_TEXT',
    SUBMIT_EDIT = 'SUBMIT_EDIT',
    ADD_ENTRIES = 'ADD_ENTRIES',
    DELETE_ENTRY = 'DELETE_ENTRY',
    SHRED_ENTRY = 'SHRED_ENTRY',
    RESTORE_ENTRY = 'RESTORE_ENTRY',
    START_BIN = 'START_BIN',
}

export interface DiaryAction {
    type: DiaryActionType;
    payload: string | number | entryType | entryType[];
}

export interface StateType {
    entries: entryType[];
    entry: string;
    entryEditing: null | number;
    editingText: string;
    bin: entryType[];
    showAllEntries: boolean;
    showBin: boolean;
    showEntry: boolean;
}

export const diaryReducer = (state: StateType, action: DiaryAction) => {
    const { type, payload } = action;
    switch (type) {
        case DiaryActionType.NEW_CHANGE_TEXT:
            return {
                ...state,
                entry: payload,
            };

        case DiaryActionType.SUBMIT_NEW:
            if (state.entry === '')
                return {
                    ...state,
                };

            const newEntry: entryType = {
                id: uuidv4(),
                text: state.entry,
                time: new Date(Date.now()).toLocaleString().slice(0, -3),
                changed: false,
                timeOfChange: null,
            };
            return {
                ...state,
                entries: [...state.entries].concat(newEntry),
                entry: '',
            };

        case DiaryActionType.EDITING_CHANGE_TEXT:
            return {
                ...state,
                editingText: payload,
            };

        case DiaryActionType.SUBMIT_EDIT:
            const updatedEntries = [...state.entries].map((entry) => {
                if (entry.id === payload) {
                    entry.text = state.editingText;
                    entry.changed = true;
                    entry.timeOfChange = new Date(Date.now())
                        .toLocaleString()
                        .slice(0, -3);
                }
                return entry;
            });
            return {
                ...state,
                entries: updatedEntries,
                entryEditing: null,
            };

        case DiaryActionType.ADD_ENTRIES:
            return {
                ...state,
                entries: payload,
            };

        case DiaryActionType.DELETE_ENTRY:
            return {
                ...state,
                bin: [...state.bin].concat(
                    [...state.entries].filter((entry) => entry.id === payload)
                ),
                entries: [...state.entries].filter((entry) => entry.id !== payload),
            };
        case DiaryActionType.SHRED_ENTRY:
            return {
                ...state,
                bin: [...state.bin].filter((entry) => entry.id !== payload),
            };

        case DiaryActionType.RESTORE_ENTRY:
            return {
                ...state,
                entries: [...state.entries].concat(
                    [...state.bin].filter((entry) => entry.id === payload)
                ),
                bin: [...state.bin].filter((entry) => entry.id !== payload),
            };

        case DiaryActionType.START_BIN:
            return {
                ...state,
                bin: payload,
            };

        default:
            return state;
    }
};