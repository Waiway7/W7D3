import React from 'react';
import { connect } from 'react-redux';
import {fetchUserTracks, deleteTrack, updateTrack} from '../../actions/track_actions';
import {openUploadModal, closeUploadModal} from '../../actions/modal_actions';
import TrackItem from './track_item'
import UpdateModal from './modal_update'

class Tracks extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
        this.props.fetchUserTracks(this.props.currentUser)
    }
    
    // componentDidUpdate(prevProps){
    //     if (prevProps.tracks.length != this.props.tracks.length){
    //         this.props.fetchUserTracks(this.props.currentUser)
    //       }
    // }

    render(){
        let tracks;
        let trackList;
        if (this.props.tracks) {
            tracks = Object.keys(this.props.tracks).map(id => this.props.tracks[id])
            trackList = tracks.map(track => {return (
                <TrackItem 
                    key={`track-id${track.id}`} 
                    track={track}
                    updateTrack={this.props.updateTrack}
                    deleteTrack={this.props.deleteTrack}
                    openUploadModal={this.props.openUploadModal}
                    closeUploadModal={this.props.closeUploadModal}
                    modal={this.props.modal}
                />
            )})
        }

        let modalComponent;
        if (this.props.modal) {
            modalComponent = (
                <UpdateModal 
                    track={this.props.tracks[this.props.modal]} 
                    updateTrack={this.props.updateTrack}
                    closeUploadModal={this.props.closeUploadModal}
                />
            )
        }
        return (
            <div className="your-track-list">
                <div className="user-nav">
                    <div className="upload-tag">
                        Upload
                    </div>
                    <div className="tracks-tag">
                        Your Tracks
                    </div>
                </div>
                <div className="header-tracks"><p>Your Tracks</p></div>
                <ul className="user-track-list">{trackList}</ul>
                {modalComponent}
                {/* <UploadModal track={this.props.tracks} modal={this.props.modal}/> */}
            </div>
        )
    }
}

const msp = (state) => {
    return {
        currentUser: state.session.id,
        tracks: state.entities.tracks,
        modal: state.ui.uploadModal
    }
}

const mdp = dispatch => {
    return {
        fetchUserTracks: user => dispatch(fetchUserTracks(user)),
        updateTrack: (track, id) => dispatch(updateTrack(track, id)),
        deleteTrack: id => dispatch(deleteTrack(id)),
        openUploadModal: (trackId) => dispatch(openUploadModal(trackId)),
        closeUploadModal: () => dispatch(closeUploadModal())
    }
}

export default connect(msp, mdp)(Tracks);
