interface GraphMenuTabProps {
  title: string;
  icon: string;
}

const GraphMenuTab = ({ title, icon }: GraphMenuTabProps) => {
  return (
    <div>
      <img src={`src/assets/icons/flat/${icon}`} />
      <span>{title}</span>
    </div>
  );
};

export default GraphMenuTab;
