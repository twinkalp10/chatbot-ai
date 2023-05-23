import { Separator } from "@/components/ui/separator"

export default async function SettingsBillingPage() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage billing and your subscription plan.
        </p>
      </div>
      <Separator />
      {/* <AccountForm /> */}
    </div>
  )
}
