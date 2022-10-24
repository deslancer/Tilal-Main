export class DeviceIdentifierHelper {

     isMobile(){
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];

        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

     isIOS(){
        const toMatch = [
            /iPhone/i,
            /iPad/i,
            /iPod/i,
        ];
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }
    checkIOSVersion() {
        let agent = window.navigator.userAgent,
            start = agent.indexOf( 'OS ' );
        if( ( agent.indexOf( 'iPhone' ) > -1 || agent.indexOf( 'iPad' ) > -1 ) && start > -1 ){
            return agent.substr( start + 3, 6 );
        }
        return 0;
    }
}
