"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

interface PriceBreakdownProps {
  currentPrice: number;
}

const COMMISSION_RATE = 0.10; // 10%
const SERVICE_FEE_RATE = 0.05; // 5%
const SELLER_FEE_RATE = 0.03; // 3%

export default function PriceBreakdown({ currentPrice }: PriceBreakdownProps) {
  const [commission, setCommission] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [sellerFee, setSellerFee] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);

  useEffect(() => {
    const calculatedCommission = currentPrice * COMMISSION_RATE;
    const calculatedServiceFee = currentPrice * SERVICE_FEE_RATE;
    const calculatedSellerFee = currentPrice * SELLER_FEE_RATE;
    const calculatedTotalPayout = currentPrice - calculatedCommission - calculatedServiceFee - calculatedSellerFee;

    setCommission(calculatedCommission);
    setServiceFee(calculatedServiceFee);
    setSellerFee(calculatedSellerFee);
    setTotalPayout(calculatedTotalPayout);
  }, [currentPrice]);

  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span>Listing Price:</span>
          <span>{formatCurrency(currentPrice)}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Commission ({(COMMISSION_RATE * 100).toFixed(0)}%):</span>
          <span>- {formatCurrency(commission)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Service Fee ({(SERVICE_FEE_RATE * 100).toFixed(0)}%):</span>
          <span>- {formatCurrency(serviceFee)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Platform Fee ({(SELLER_FEE_RATE * 100).toFixed(0)}%):</span>
          <span>- {formatCurrency(sellerFee)}</span>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex justify-between font-semibold text-lg">
        <span>Your Estimated Payout:</span>
        <span>{formatCurrency(totalPayout)}</span>
      </CardFooter>
    </Card>
  );
}