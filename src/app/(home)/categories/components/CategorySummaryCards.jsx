"use client";

import { Tag, CheckCircle, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CategorySummaryCards({ totalCategories, inUseCategories }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="border-l-4 border-l-violet-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Categories
          </CardTitle>
          <LayoutGrid className="size-4 text-violet-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-violet-600">{totalCategories}</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            In Use
          </CardTitle>
          <CheckCircle className="size-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-emerald-600">{inUseCategories}</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Unused
          </CardTitle>
          <Tag className="size-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-blue-600">
            {totalCategories - inUseCategories}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
