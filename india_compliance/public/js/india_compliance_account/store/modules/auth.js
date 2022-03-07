import {
    get_api_secret,
    get_session as get_session,
    validate_session,
} from "../../services/authService";

export default {
    state: {
        api_secret: null,
        session: null,
    },

    mutations: {
        SET_API_SECRET(state, api_secret) {
            state.api_secret = api_secret;
        },

        SET_SESSION(state, session) {
            state.session = session;
        },
    },

    actions: {
        async initAuth({ dispatch }) {
            await dispatch("authenticate");
        },

        async authenticate({ commit, state, dispatch }) {
            let api_secret = await get_api_secret();

            if (!api_secret) {
                await dispatch("fetchSession");
                if (!state.session) return;
                api_secret = await validate_session(state.session.id);
            }

            if (!api_secret) return;
            commit("SET_API_SECRET", api_secret);
            dispatch("setSession", null);
        },

        setSession({ commit }, session) {
            commit("SET_SESSION", session);
        },

        async fetchSession({ dispatch }) {
            dispatch("setSession", await get_session());
        },
    },

    getters: {
        isLoggedIn(state) {
            return !!state.api_secret;
        },

        hasSession(state) {
            return !!state.session;
        },
    },
};