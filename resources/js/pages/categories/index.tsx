import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { create } from '@/actions/App/Http/Controllers/CategoryController';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    href: '/categories',
  },
];

interface Category {
  id: number,
  name: string,
  description: string | null
}

export default function Index({ categories }: {categories: Category[]}) {
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col h-full gap-4 rounded-xl p-5">
      <Link href={create()}>
        <Button className='w-fit'>
          New category
        </Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                {category.description ?? 'No description'}
              </TableCell>
              <TableCell className="font-medium">
                <div className='flex gap-3'>
                  <Button>
                    Edit
                  </Button>
                  <Button variant={'destructive'}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </AppLayout>
  );
}