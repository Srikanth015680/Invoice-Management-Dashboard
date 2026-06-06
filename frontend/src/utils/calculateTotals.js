const calculateTotals = (
  amount,
  taxRate
) => {
  const invoiceAmount =
    Number(amount) || 0;

  const rate =
    Number(taxRate) || 0;

  const tax = Number(
    (
      invoiceAmount *
      (rate / 100)
    ).toFixed(2)
  );

  const total = Number(
    (
      invoiceAmount + tax
    ).toFixed(2)
  );

  return {
    tax,
    total,
  };
};

export default calculateTotals;