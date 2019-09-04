import {RECEIVE_PLAYLISTS_TRACKS, RECEIVE_PLAYLIST_TRACKS, DELETE_PLAYLIST_TRACK} from "../../actions/playlist_tracks_actions";
import {merge} from "lodash";
const playlistsTracksReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_PLAYLISTS_TRACKS:
            return merge({}, action.playlistsTracks);
        // case RECEIVE_PLAYLIST_TRACKS: 
        //     return merge({}, state, action.playlistTracks);
        case DELETE_PLAYLIST_TRACK:
            let newState = merge({}, state);
            delete newState[action.playlistTrackId];
            return newState;
        default:
            return state;
    }
}

export default playlistsTracksReducer;