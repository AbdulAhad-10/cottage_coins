"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MOCK_CATEGORIES } from "../data/mock-transactions";

export function TransactionModal({
  open,
  onOpenChange,
  isEditing,
  formName,
  onFormNameChange,
  formAmount,
  onFormAmountChange,
  formDate,
  onFormDateChange,
  formType,
  onFormTypeChange,
  formPaymentMethod,
  onFormPaymentMethodChange,
  formCategory,
  onFormCategoryChange,
  formDescription,
  onFormDescriptionChange,
  onSave,
  onCancel,
  isFormValid,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
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
              onChange={(e) => onFormNameChange(e.target.value)}
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
              onChange={(e) => onFormAmountChange(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="form-date">Date</Label>
            <Input
              id="form-date"
              type="date"
              value={formDate}
              onChange={(e) => onFormDateChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <div className="flex rounded-md border p-1">
              <button
                type="button"
                onClick={() => onFormTypeChange("income")}
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
                onClick={() => onFormTypeChange("expense")}
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
            <Select value={formPaymentMethod} onValueChange={onFormPaymentMethodChange}>
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
            <Select value={formCategory} onValueChange={onFormCategoryChange}>
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
              onChange={(e) => onFormDescriptionChange(e.target.value)}
              placeholder="Add notes..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={!isFormValid}>
            {isEditing ? "Save Changes" : "Save Transaction"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
