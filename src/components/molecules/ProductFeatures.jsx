const ProductFeatures = ({ features, specifications }) => {
  if (!features && !specifications) return null;

  return (
    <div className="space-y-8">
      {features && features.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white font-[Orbitron] mb-4">
            Características Principales
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 text-white/80 font-[Roboto]"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {specifications && Object.keys(specifications).length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white font-[Orbitron] mb-4">
            Especificaciones Técnicas
          </h3>
          <div className="bg-black/50 border border-green-400/30 rounded-lg p-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-2 border-b border-green-400/10 last:border-b-0"
                >
                  <dt className="text-green-400 font-bold text-sm font-[Roboto]">
                    {key}:
                  </dt>
                  <dd className="text-white/80 text-sm font-[Roboto]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFeatures;
