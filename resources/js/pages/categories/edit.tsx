import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { index, edit, update } from '@/actions/App/Http/Controllers/CategoryController';
import { Form } from '@inertiajs/react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import toast from "../../lib/toasts"
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    href: index.url()
  },
  {
    title: 'Edit',
    href: '',
  },
];

interface Category {
  id: number,
  name: string,
  description: string
}

interface FlashMessages {
  success?: string;
  error?: string;
}

export default function Edit({ category }: { category: Category}) {  
  const flash = usePage().props.flash as FlashMessages;
  
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error, 'An error occurred.');
    }
  }, [flash]);

  breadcrumbs[1].href = edit.url(category.id);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Form action={update(category.id)} resetOnSuccess >
          {
            ({
              errors,
              processing
            }) => (
              <div className="flex flex-col max-w-sm gap-6 mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className='text-2xl'>Edit category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          defaultValue={category.name}
                          placeholder="Name..."
                          required
                        />
                        {
                          errors.name && 
                            <div className='text-red-600 italic'>
                              *{errors.name}
                            </div>
                        }
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          name="description"
                          type="text"
                          defaultValue={category.description}
                          placeholder="Description..."
                        />
                        {
                          errors.description && 
                            <div className='text-red-600 italic'>
                              *{errors.description}
                            </div>
                        }
                      </div>
                      <div className="flex flex-col gap-3">
                        <Button type="submit" disabled={processing}>
                          Update
                        </Button>
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