

const ContentArea = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="grid grid-flow-col justify-center max-md:grid-flow-row pt-7">
      {children}
    </div>
  );
}
export default ContentArea;