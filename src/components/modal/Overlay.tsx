export const Overlay = ({show}: { show: boolean }) => {
    return show ? (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 2,
            }}
        />
    ) : null;
};
