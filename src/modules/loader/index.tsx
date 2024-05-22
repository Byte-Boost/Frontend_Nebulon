import { twMerge } from "tailwind-merge";


interface LoaderAnimProps {
    className?: string;
  }

const LoaderAnim = ({className}: LoaderAnimProps) => {
    const styles = {
        spinner_LWk7: {
            animation: 'spinner_GWy6 1.2s linear infinite, spinner_BNNO 1.2s linear infinite'
        },
        spinner_yOMU: {
            animation: 'spinner_GWy6 1.2s linear infinite, spinner_pVqn 1.2s linear infinite',
            animationDelay: '.15s'
        },
        spinner_KS4S: {
            animation: 'spinner_GWy6 1.2s linear infinite, spinner_6uKB 1.2s linear infinite',
            animationDelay: '.3s'
        },
        spinner_zVee: {
            animation: 'spinner_GWy6 1.2s linear infinite, spinner_Qw4x 1.2s linear infinite',
            animationDelay: '.45s'
        }
    };

    return(
        <svg 
            width="500"
            height="500" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
            className={twMerge('w-35 h-35 fill-purple-500 stroke-purple-500',className)}   
        >
            <rect style={styles.spinner_LWk7} x="1.5" y="1.5" rx="1" width="9" height="9"/>
            <rect style={styles.spinner_yOMU} x="13.5" y="1.5" rx="1" width="9" height="9"/>
            <rect style={styles.spinner_KS4S} x="13.5" y="13.5" rx="1" width="9" height="9"/>
            <rect style={styles.spinner_zVee} x="1.5" y="13.5" rx="1" width="9" height="9"/>
        </svg>
    );
}
export default LoaderAnim;

