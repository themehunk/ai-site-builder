import { Skeleton } from '@mui/material';

export default function SkeletonLoader() {

    return (<>
    <div class="skeleton-container">
        <div class="header-skeleton">
            <div class="hs-column hs-first-column">
            <Skeleton className = "hs-box-large" animation="wave" variant="rectangular" width={120} height={40} />
            </div>
            <div class="hs-column hs-second-column">
            <Skeleton className = "hs-box" animation="wave" variant="rectangular" width={80} height={40} />
            <Skeleton className = "hs-box" animation="wave" variant="rectangular" width={80} height={40} />
            <Skeleton className = "hs-box" animation="wave" variant="rectangular" width={80} height={40} />
            <Skeleton className = "hs-box" animation="wave" variant="rectangular" width={80} height={40} />
            <Skeleton className = "hs-box-large" animation="wave" variant="rectangular" width={120} height={40} />
            </div>
        </div>

  {/* -- two colum main box -- */}

         <div class="skeleton-main">
          <div class="ms-column">
          <Skeleton className = "hs-box" animation="wave" variant="rectangular" width={400} height={90} />
          <Skeleton className = "hs-line"  animation="wave" variant="text" sx={{ fontSize: '1rem' }} width={400} height={30}  />
          <Skeleton className = "hs-line"  animation="wave" variant="text" sx={{ fontSize: '1rem' }} width={400} height={30} />
          <Skeleton className = "hs-box-large" animation="wave" variant="rectangular" width={150} height={40} />
          </div>
          <div class="ms-column">
          <Skeleton className = "hs-box" animation="wave" variant="rectangular" width={452} height={250} />
          </div>
        </div>

  {/* -- three colum main box -- */}

    <div class="skeleton-footer">
    <div class="sf-column">
    <Skeleton  className = "hs-box-large" animation="wave" variant="rectangular" width={280} height={200} />
    </div>
    <div class="sf-column">
    <Skeleton  className = "hs-box-large" animation="wave" variant="rectangular" width={280} height={200} />
    </div>
    <div class="sf-column">
    <Skeleton  className = "hs-box-large" animation="wave" variant="rectangular" width={280} height={200} />
    </div>
  </div>
</div>
    </>);

}