interface DestinationProps {
    image: string;
    name: string;
    description: string;
  }
  
  const DestinationCard = ({ image, name, description }: DestinationProps) => {
    return (
      <div className="border rounded-lg overflow-hidden shadow-md">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  };
  
  export default DestinationCard;
  