export default function LoadingSpinner({ count }: { count: number}) {
    const skeletonCards = [];

    for (let i = 0; i < count; i++) {
        skeletonCards.push(<div key={i} className="card-skeleton" />);
    }

    return (
        <div className="bsf-spacex-loading-spinner">
            <div className="skeleton-loader">
                {skeletonCards}
            </div>
        </div>
    );
}
