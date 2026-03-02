"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Download,
  TrendingUp,
  TrendingDown,
  Wallet,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock categories
const MOCK_CATEGORIES = [
  { _id: "cat-1", name: "Spice Sales", color: "#22c55e" },
  { _id: "cat-2", name: "Bulk Orders", color: "#3b82f6" },
  { _id: "cat-3", name: "Packaging", color: "#f59e0b" },
  { _id: "cat-4", name: "Raw Materials", color: "#8b5cf6" },
  { _id: "cat-5", name: "Export", color: "#06b6d4" },
  { _id: "cat-6", name: "Utilities", color: "#64748b" },
  { _id: "cat-7", name: "Shipping", color: "#ec4899" },
];

// Mock transactions for a spice business
const MOCK_TRANSACTIONS = [
  {
    _id: "tx-1",
    name: "Cumin Seed Sale",
    amount: 1250,
    date: "2025-03-01",
    description: "Wholesale cumin seeds to local distributor",
    type: "income",
    paymentMethod: "bank transfer",
    category: { _id: "cat-1", name: "Spice Sales", color: "#22c55e" },
    user: "user-1",
    createdAt: "2025-03-01T10:00:00Z",
    updatedAt: "2025-03-01T10:00:00Z",
  },
  {
    _id: "tx-2",
    name: "Packaging Purchase",
    amount: 340,
    date: "2025-03-02",
    description: "Jars and labels for retail packaging",
    type: "expense",
    paymentMethod: "credit card",
    category: { _id: "cat-3", name: "Packaging", color: "#f59e0b" },
    user: "user-1",
    createdAt: "2025-03-02T14:30:00Z",
    updatedAt: "2025-03-02T14:30:00Z",
  },
  {
    _id: "tx-3",
    name: "Turmeric Bulk Order",
    amount: 890,
    date: "2025-03-03",
    description: "50kg turmeric powder from supplier",
    type: "expense",
    paymentMethod: "bank transfer",
    category: { _id: "cat-4", name: "Raw Materials", color: "#8b5cf6" },
    user: "user-1",
    createdAt: "2025-03-03T09:15:00Z",
    updatedAt: "2025-03-03T09:15:00Z",
  },
  {
    _id: "tx-4",
    name: "Cardamom Export",
    amount: 4500,
    date: "2025-03-04",
    description: "International export order - Europe",
    type: "income",
    paymentMethod: "bank transfer",
    category: { _id: "cat-5", name: "Export", color: "#06b6d4" },
    user: "user-1",
    createdAt: "2025-03-04T11:00:00Z",
    updatedAt: "2025-03-04T11:00:00Z",
  },
  {
    _id: "tx-5",
    name: "Coriander Stock Purchase",
    amount: 520,
    date: "2025-03-05",
    description: "Fresh coriander seeds for grinding",
    type: "expense",
    paymentMethod: "cash",
    category: { _id: "cat-4", name: "Raw Materials", color: "#8b5cf6" },
    user: "user-1",
    createdAt: "2025-03-05T08:45:00Z",
    updatedAt: "2025-03-05T08:45:00Z",
  },
  {
    _id: "tx-6",
    name: "Black Pepper Retail Sale",
    amount: 180,
    date: "2025-03-06",
    description: "Retail sales at farmer's market",
    type: "income",
    paymentMethod: "cash",
    category: { _id: "cat-1", name: "Spice Sales", color: "#22c55e" },
    user: "user-1",
    createdAt: "2025-03-06T16:00:00Z",
    updatedAt: "2025-03-06T16:00:00Z",
  },
  {
    _id: "tx-7",
    name: "Electricity Bill",
    amount: 95,
    date: "2025-03-07",
    description: "Monthly utility payment",
    type: "expense",
    paymentMethod: "bank transfer",
    category: { _id: "cat-6", name: "Utilities", color: "#64748b" },
    user: "user-1",
    createdAt: "2025-03-07T10:00:00Z",
    updatedAt: "2025-03-07T10:00:00Z",
  },
  {
    _id: "tx-8",
    name: "Chili Powder Bulk Sale",
    amount: 2100,
    date: "2025-03-08",
    description: "Restaurant supply order - 20kg",
    type: "income",
    paymentMethod: "credit card",
    category: { _id: "cat-2", name: "Bulk Orders", color: "#3b82f6" },
    user: "user-1",
    createdAt: "2025-03-08T12:30:00Z",
    updatedAt: "2025-03-08T12:30:00Z",
  },
  {
    _id: "tx-9",
    name: "Courier Shipping",
    amount: 78,
    date: "2025-03-09",
    description: "Express delivery for urgent orders",
    type: "expense",
    paymentMethod: "credit card",
    category: { _id: "cat-7", name: "Shipping", color: "#ec4899" },
    user: "user-1",
    createdAt: "2025-03-09T14:00:00Z",
    updatedAt: "2025-03-09T14:00:00Z",
  },
  {
    _id: "tx-10",
    name: "Garam Masala Mix Sale",
    amount: 640,
    date: "2025-03-10",
    description: "Premium blended masala - retail",
    type: "income",
    paymentMethod: "cash",
    category: { _id: "cat-1", name: "Spice Sales", color: "#22c55e" },
    user: "user-1",
    createdAt: "2025-03-10T11:20:00Z",
    updatedAt: "2025-03-10T11:20:00Z",
  },
  {
    _id: "tx-11",
    name: "Clove Import",
    amount: 1120,
    date: "2025-03-11",
    description: "Clove stock from Zanzibar supplier",
    type: "expense",
    paymentMethod: "bank transfer",
    category: { _id: "cat-4", name: "Raw Materials", color: "#8b5cf6" },
    user: "user-1",
    createdAt: "2025-03-11T09:00:00Z",
    updatedAt: "2025-03-11T09:00:00Z",
  },
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deleteTransaction, setDeleteTransaction] = useState(null);

  // Form state
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
    setTransactions((prev) => prev.filter((t) => t._id !== deleteTransaction._id));
    setDeleteTransaction(null);
  };

  const isFormValid =
    formName.trim() !== "" &&
    formAmount !== "" &&
    parseFloat(formAmount) >= 0 &&
    formDate !== "" &&
    formCategory !== "";

  // Filtered transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      !search ||
      tx.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      typeFilter === "all" || tx.type === typeFilter;
    const matchesPayment =
      paymentFilter === "all" || tx.paymentMethod === paymentFilter;
    const txDate = tx.date?.split?.("T")?.[0] ?? tx.date ?? "";
    const matchesDateFrom = !dateFrom || txDate >= dateFrom;
    const matchesDateTo = !dateTo || txDate <= dateTo;

    return matchesSearch && matchesType && matchesPayment && matchesDateFrom && matchesDateTo;
  });

  // Summary values
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
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            Manage your income and expenses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Export
          </Button>
          <Button size="sm" onClick={openAddModal}>
            <Plus className="size-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Income
            </CardTitle>
            <TrendingUp className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              {formatCurrency(totalIncome)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
            <TrendingDown className="size-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Balance
            </CardTitle>
            <Wallet className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p
              className={cn(
                "text-2xl font-bold",
                netBalance >= 0 ? "text-blue-600" : "text-red-600"
              )}
            >
              {formatCurrency(netBalance)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-violet-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Transactions
            </CardTitle>
            <Hash className="size-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-violet-600">{totalCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full lg:w-[160px]">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="credit card">Credit Card</SelectItem>
                <SelectItem value="bank transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Label htmlFor="date-from" className="whitespace-nowrap text-sm">
                  From
                </Label>
                <Input
                  id="date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="date-to" className="whitespace-nowrap text-sm">
                  To
                </Label>
                <Input
                  id="date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No transactions match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell className="font-medium">{tx.name}</TableCell>
                    <TableCell>
                      <Badge
                        className="border-0 text-white"
                        style={{
                          backgroundColor:
                            tx.category?.color ?? "#64748b",
                        }}
                      >
                        {tx.category?.name ?? "—"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(tx.date)}</TableCell>
                    <TableCell className="capitalize">
                      {tx.paymentMethod.replace(" ", " ")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={tx.type === "income" ? "default" : "destructive"}
                        className={cn(
                          tx.type === "income"
                            ? "bg-emerald-600 hover:bg-emerald-600"
                            : ""
                        )}
                      >
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-medium",
                        tx.type === "income"
                          ? "text-emerald-600"
                          : "text-red-600"
                      )}
                    >
                      {tx.type === "income" ? "+" : "−"}
                      {formatCurrency(tx.amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEditModal(tx)}
                          aria-label="Edit"
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setDeleteTransaction(tx)}
                          aria-label="Delete"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </DialogTitle>
            <DialogDescription>
              {editingTransaction
                ? "Update the transaction details below."
                : "Fill in the details to add a new transaction."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="form-name">Name</Label>
              <Input
                id="form-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Cumin Seed Sale"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-amount">Amount</Label>
              <Input
                id="form-amount"
                type="number"
                min="0"
                step="0.01"
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-date">Date</Label>
              <Input
                id="form-date"
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <div className="flex rounded-md border p-1">
                <button
                  type="button"
                  onClick={() => setFormType("income")}
                  className={cn(
                    "flex-1 rounded px-3 py-2 text-sm font-medium transition-colors",
                    formType === "income"
                      ? "bg-emerald-600 text-white"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setFormType("expense")}
                  className={cn(
                    "flex-1 rounded px-3 py-2 text-sm font-medium transition-colors",
                    formType === "expense"
                      ? "bg-red-600 text-white"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  Expense
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select
                value={formPaymentMethod}
                onValueChange={setFormPaymentMethod}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit card">Credit Card</SelectItem>
                  <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formCategory} onValueChange={setFormCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CATEGORIES.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="form-desc">Description (optional)</Label>
              <Textarea
                id="form-desc"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Add notes..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveTransaction} disabled={!isFormValid}>
              {editingTransaction ? "Save Changes" : "Save Transaction"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTransaction}
        onOpenChange={(open) => !open && setDeleteTransaction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteTransaction?.name}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTransaction}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
