import { redirect } from 'next/navigation';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getUserOrders } from '@/lib/data/orders';
import { formatCurrency, formatDate } from '@/lib/utils/format';

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'info' | 'error' | 'default'; label: string }> = {
  completed: { variant: 'success', label: 'Payé' },
  pending: { variant: 'warning', label: 'En attente' },
  processing: { variant: 'info', label: 'En cours' },
  cancelled: { variant: 'error', label: 'Annulé' },
  refunded: { variant: 'default', label: 'Remboursé' },
};

export default async function OrdersPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?next=/dashboard/orders');

  const orders = await getUserOrders(user.id);

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500">Vous n&apos;avez pas encore passé de commande.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const cfg = statusConfig[order.status] || { variant: 'default' as const, label: order.status };
        return (
          <div key={order.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Commande #{order.id.slice(0, 8)}</p>
                <p className="text-xs text-gray-500">{formatDate(order.createdAt, 'long')}</p>
              </div>
              <Badge variant={cfg.variant}>{cfg.label}</Badge>
            </div>
            <div className="space-y-1.5 mb-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>{item.name} {item.quantity > 1 ? `× ${item.quantity}` : ''}</span>
                  <span>{formatCurrency(item.price * item.quantity, order.currency)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-500">Total</span>
              <span className="font-bold text-cipresa-600">{formatCurrency(order.total, order.currency)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
