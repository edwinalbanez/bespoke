import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { index, create, store } from '@/actions/App/Http/Controllers/ProductController';
import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import toast from "../../lib/toasts"
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageField from '@/components/forms/image-field';
import FormField from '@/components/forms/form-field';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    href: index.url()
  },
  {
    title: 'Create',
    href: create.url(),
  },
];

interface FlashMessages {
  success?: string;
  error?: string;
}

export default function Create() {
  const flash = usePage().props.flash as FlashMessages;

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error, 'An error occurred');
    }
  }, [flash]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Form action={store()} resetOnSuccess >
          {
            ({
              errors,
              processing
            }) => (
              <div className="flex flex-col max-w-3xl gap-6 mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className='text-2xl'>New product</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <div className='flex flex-col sm:flex-row gap-10'>
                        <FormField
                          label='Name'
                          name='name'
                          required
                          error={errors.name}
                        />
                        <FormField
                          label='Description'
                          name='description'
                          error={errors.description}
                        />
                      </div>
                      <div className='flex flex-col sm:flex-row gap-10'>
                        <FormField
                          label='Sale price'
                          name='sale_price'
                          required
                          error={errors.sale_price}
                        />
                        <FormField
                          label='Purchase price'
                          name='purchase_price'
                          required
                          error={errors.purchase_price}
                        />
                      </div>
                      <ImageField
                        error={errors.image}
                      />
                      <div className="flex flex-col gap-3">
                        <Button type="submit" disabled={processing}>
                          Create
                        </Button>
                        <Link href={index.url()} prefetch='click'>
                          <Button 
                            variant={'secondary'} 
                            disabled={processing}
                            className='w-full'
                          >
                            See categories
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          }
        </Form>
      </div>
    </AppLayout>
  );
}