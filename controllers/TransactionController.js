import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
  const demo = await Transaction.aggregate([
    {
      $match: { user_id: req.user._id },
    },
    {
      $group: {
        _id: { $month: "$date" },
        transactions: {
          $push: {
            amount: "$amount",
            description: "$description",
            date: "$date",
            type: "$type",
            _id: "$_id",
          },
        },
        totalExpenses: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json({ data: demo });
};

export const deleteTransaction = async (req, res) => {
  await Transaction.deleteOne({ _id: req.params.id });
  res.json({ message: "success" });
};

export const addTransaction = async (req, res) => {
  const { amount, description, date } = req.body;
  // console.log(req.user);
  const transaction = new Transaction({
    amount,
    description,
    user_id: req.user._id,
    date,
    category_id: req.category_id,
  });
  await transaction.save();
  res.json({ message: "Success" });
};

export const updateTransaction = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "Updated Successfully" });
};
