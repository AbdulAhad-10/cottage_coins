"use client";

import { useState } from "react";
import { MOCK_TRANSACTIONS, MOCK_CATEGORIES } from "./data/mock-transactions";
import { TransactionsPageHeader } from "./components/TransactionsPageHeader";
import { SummaryCards } from "./components/SummaryCards";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionModal } from "./components/TransactionModal";
import { DeleteTransactionDialog } from "./components/DeleteTransactionDialog";
import { Card } from "@/components/ui/card";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deleteTransaction, setDeleteTransaction] = useState(null);

  const [formName, setFormName] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formType, setFormType] = useState("expense");
  const [formPaymentMethod, setFormPaymentMethod] = useState("cash");
  const [formCategory, setFormCategory] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setPaymentFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  const resetForm = () => {
    setFormName("");
    setFormAmount("");
    setFormDate("");
    setFormType("expense");
    setFormPaymentMethod("cash");
    setFormCategory("");
    setFormDescription("");
    setEditingTransaction(null);
  };

  const openAddModal = () => {
    resetForm();
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormCategory(MOCK_CATEGORIES[0]?._id ?? "");
    setIsModalOpen(true);
  };

  const openEditModal = (tx) => {
    setEditingTransaction(tx);
    setFormName(tx.name);
    setFormAmount(String(tx.amount));
    setFormDate(tx.date?.split?.("T")?.[0] ?? tx.date);
    setFormType(tx.type);
    setFormPaymentMethod(tx.paymentMethod);
    setFormCategory(tx.category?._id ?? "");
    setFormDescription(tx.description ?? "");
    setIsModalOpen(true);
  };

  const handleSaveTransaction = () => {
    if (!formName.trim() || !formAmount || !formDate || !formCategory) return;

    const amount = parseFloat(formAmount);
    if (isNaN(amount) || amount < 0) return;

    const category = MOCK_CATEGORIES.find((c) => c._id === formCategory);
    const payload = {
      name: formName.trim(),
      amount,
      date: formDate,
      type: formType,
      paymentMethod: formPaymentMethod,
      category: category ?? MOCK_CATEGORIES[0],
      description: formDescription.trim(),
    };

    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t._id === editingTransaction._id
            ? { ...t, ...payload, updatedAt: new Date().toISOString() }
            : t
        )
      );
    } else {
      setTransactions((prev) => [
        ...prev,
        {
          ...payload,
          _id: `tx-${Date.now()}`,
          user: "user-1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteTransaction = () => {
    if (!deleteTransaction) return;
    setTransactions((prev) =>
      prev.filter((t) => t._id !== deleteTransaction._id)
    );
    setDeleteTransaction(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const isFormValid =
    formName.trim() !== "" &&
    formAmount !== "" &&
    parseFloat(formAmount) >= 0 &&
    formDate !== "" &&
    formCategory !== "";

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      !search || tx.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesPayment =
      paymentFilter === "all" || tx.paymentMethod === paymentFilter;
    const txDate = tx.date?.split?.("T")?.[0] ?? tx.date ?? "";
    const matchesDateFrom = !dateFrom || txDate >= dateFrom;
    const matchesDateTo = !dateTo || txDate <= dateTo;

    return (
      matchesSearch &&
      matchesType &&
      matchesPayment &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;
  const totalCount = filteredTransactions.length;

  return (
    <div className="space-y-6">
      <TransactionsPageHeader onAddTransaction={openAddModal} />

      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netBalance={netBalance}
        totalCount={totalCount}
      />

      <TransactionFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        paymentFilter={paymentFilter}
        onPaymentFilterChange={setPaymentFilter}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        onReset={resetFilters}
      />

      <Card>
        <TransactionsTable
          transactions={filteredTransactions}
          onEdit={openEditModal}
          onDelete={setDeleteTransaction}
        />
      </Card>

      <TransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        isEditing={!!editingTransaction}
        formName={formName}
        onFormNameChange={setFormName}
        formAmount={formAmount}
        onFormAmountChange={setFormAmount}
        formDate={formDate}
        onFormDateChange={setFormDate}
        formType={formType}
        onFormTypeChange={setFormType}
        formPaymentMethod={formPaymentMethod}
        onFormPaymentMethodChange={setFormPaymentMethod}
        formCategory={formCategory}
        onFormCategoryChange={setFormCategory}
        formDescription={formDescription}
        onFormDescriptionChange={setFormDescription}
        onSave={handleSaveTransaction}
        onCancel={handleModalCancel}
        isFormValid={isFormValid}
      />

      <DeleteTransactionDialog
        transaction={deleteTransaction}
        open={!!deleteTransaction}
        onOpenChange={(open) => !open && setDeleteTransaction(null)}
        onConfirm={handleDeleteTransaction}
      />
    </div>
  );
}
