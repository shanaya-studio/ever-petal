function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row items-center gap-5">

      {/* Flower Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-28 object-cover rounded-xl"
      />

      {/* Flower Information */}
      <div className="flex-1 text-center sm:text-left">

        <h2 className="text-xl font-bold text-green-700">
          {item.name}
        </h2>

        <p className="text-gray-500 mt-1">
          ${item.price} each
        </p>

        {/* Quantity */}
        <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">

          <button
            onClick={() => onDecrease(item.id)}
            disabled={item.quantity === 1}
            className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 disabled:opacity-50"
          >
            -
          </button>

          <span className="font-semibold text-lg min-w-6 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item.id)}
            className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200"
          >
            +
          </button>

        </div>
      </div>

      {/* Price + Remove */}
      <div className="text-center sm:text-right">

        <p className="text-xl font-bold text-pink-500">
          ${item.price * item.quantity}
        </p>

        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-red-500 mt-2 hover:text-red-700"
        >
          Remove
        </button>

      </div>
    </div>
  );
}

export default CartItem;