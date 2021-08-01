import React from 'react';
import { WebView } from 'react-native-webview';

import {
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    PermissionsAndroid,
    Dimensions
} from 'react-native';
// Import the RtcEngine class and view rendering components into your project.
import RtcEngine, { RtcLocalView, RtcRemoteView, VideoRenderMode } from 'react-native-agora';
// Import the UI styles.

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
};

const requestCameraAndAudioPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        ]);
        if (
            granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log('You can use the cameras & mic');
        } else {
            console.log('Permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};

class WihteBorad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appId: 'd55587989a184b18a87edd6ebc6e6913',
            channelName: 'test',
            token: '006d55587989a184b18a87edd6ebc6e6913IACoxdNGjC+0mgfIkyUQsGZxeMFjc2UjAEbWCG8jJJLgmgx+f9gAAAAAEAD7XOPUDx8CYQEAAQAPHwJh',
            joinSucceed: false,
            peerIds: []
        };
        if (Platform.OS === 'android') {
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!');
            });
        }
    }

    // Mount the App component into the DOM.
    componentDidMount() {
        this.init();
    }
    // Pass in your App ID through this.state, create and initialize an RtcEngine object.
    init = async () => {
        const { appId } = this.state;
        this._engine = await RtcEngine.create(appId);
        // Enable the video module.
        await this._engine.enableVideo();

        // Listen for the UserJoined callback.
        // This callback occurs when the remote user successfully joins the channel.
        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);
            const { peerIds } = this.state;
            if (peerIds.indexOf(uid) === -1) {
                this.setState({
                    peerIds: [...peerIds, uid]
                });
            }
        });

        // Listen for the UserOffline callback.
        // This callback occurs when the remote user leaves the channel or drops offline.
        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            const { peerIds } = this.state;
            this.setState({
                // Remove peer ID from state array
                peerIds: peerIds.filter(id => id !== uid)
            });
        });

        // Listen for the JoinChannelSuccess callback.
        // This callback occurs when the local user successfully joins the channel.
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
            this.setState({
                joinSucceed: true
            });
        });
    };

    // Set the rendering mode of the video view as Hidden,
    // which uniformly scales the video until it fills the visible boundaries.
    _renderVideos = () => {
        const { joinSucceed } = this.state;
        return joinSucceed ? (
            <View style={{ width: 300, height: 400 }}>
                <RtcLocalView.SurfaceView
                    style={{ width: 100, height: 100 }}
                    channelId={this.state.channelName}
                    renderMode={VideoRenderMode.Hidden}
                />
                {/* {this._renderRemoteVideos()} */}
            </View>
        ) : null;
    };

    _renderRemoteVideos = () => {
        const { peerIds } = this.state;
        return (
            <ScrollView
                style={{ width: '100%', height: 150, position: 'absolute', top: 5 }}
                contentContainerStyle={{ paddingHorizontal: 2.5 }}
                horizontal={true}
            >
                {peerIds.map((value, index, array) => {
                    return (
                        <RtcRemoteView.SurfaceView
                            style={{ width: 150, height: 150, marginHorizontal: 2.5 }}
                            uid={value}
                            channelId={this.state.channelName}
                            renderMode={VideoRenderMode.Hidden}
                            zOrderMediaOverlay={true}
                        />
                    );
                })}
            </ScrollView>
        );
    };

    startCall = async () => {
        await this._engine?.joinChannel(this.state.token, this.state.channelName, null, 0);
    };

    render() {
        return (
            <View>
                <View style={{ height: 300 }}>
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                height: 100,
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-evenly'
                            }}
                        >
                            <TouchableOpacity
                                onPress={this.startCall}
                                style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: '#0093E9',
                                    borderRadius: 25
                                }}
                            >
                                <Text> Start Call </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.endCall}
                                style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: '#0093E9',
                                    borderRadius: 25
                                }}
                            >
                                <Text> End Call </Text>
                            </TouchableOpacity>
                        </View>
                        {this._renderVideos()}
                    </View>
                </View>
                <View style={{ height: 300, width: '100%', backgroundColor: 'red' }}>
                    <WebView
                        source={{
                            uri: 'https://whiteboard-rmt-test.ikandy.cn/miniprogram-v.html?isTeacher=true&sdkAppId=1400438933&classId=18095592&userId=oIb_25V_jEQLkaEGAcuO9uHlplZYextra&userSig=eJwtzckOgjAUBdB-6RYDpVClJi5cEDHBIENw2JAqhVQGawWCMf67iCzfubn3vUHkhmrHJFgCpEIwG2*esrrhGR-5vr0kCMfJzfbdgtqb9bX1SOuUojyfWN9IOpWeaUGF4ClY6iaEpmERw-gnDa-YoHNdJ4OTSVkvuPw5xhhBCKcVng8-Wegs4n2dNX6utVqhKQGOdt0rKislIMI9PtjB8iiSQW2twOcL0i866w__&whiteboardMove=true'
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default WihteBorad;
