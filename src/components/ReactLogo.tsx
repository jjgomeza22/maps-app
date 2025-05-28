import logo from '../assets/react.svg'

export const ReactLogo = () => {
    return (
        <img
            src={ logo }
            alt="viteLogo"
            style={{
                position: 'fixed',
                bottom: '60px',
                right: '20px',
                zIndex: 999,
                width: '118px'
            }}
        />
    );
};