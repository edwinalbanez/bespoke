import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link, InfiniteScroll, router } from '@inertiajs/react';
import { create, edit, destroy } from '@/actions/App/Http/Controllers/CategoryController';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import toast from '../../lib/toasts';
import Search from '@/components/search';
import Pagination from '@/components/pagination';
import { useDebouncedCallback } from 'use-debounce';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    href: '/categories',
  },
];

interface FlashMessages {
  success?: string;
  error?: string;
}

interface Category {
  id: number,
  name: string,
  description: string | null
}

interface Links {
  url: string | null,
  label: string,
  page: number,
  active: boolean
}

interface PaginatedCategories {
  data: Category[],
  links: Links[]
}

export default function Index({ categories }: {categories: PaginatedCategories}) {

  const flash = usePage().props.flash as FlashMessages;

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error, 'Action not completed');
    }
  }, [flash]);

  const filterRef = useRef<HTMLInputElement>(null);

  const deleteCategory = (id: number) => {
    toast.action(
      'Are you sure?',
      () => { router.delete(destroy(id)) },
      'The category cannot be recovered'
    )
  }

  const fetchWithFilter = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    router.get(
      '/categories',
      filterValue ? { filter: filterValue } : {},
      {
        reset: ['categories'],
        only: ['categories'],
        preserveState: true,
      }
    )
  }, 500)

  console.log(categories);
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categories" />
      <div className="flex flex-col h-full gap-4 rounded-xl p-5">
      <Search onChange={fetchWithFilter} ref={filterRef} />
      <Button 
        className='w-fit text-base'
        onClick={() => router.visit(create())}
      >
        New category
      </Button>
      <InfiniteScroll data='categories' manual >
          <Table>
            <TableHeader className='font-bold text-base'>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    {category.description ?? 'No description'}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className='flex gap-3'>
                      <Link href={edit(category.id)}>
                        
                      </Link>

                      <Button
                        onClick={() => router.visit(edit(category.id))}>
                        Edit
                      </Button>

                      <Button
                        onClick={() => deleteCategory(category.id)}
                        variant={'destructive'}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </InfiniteScroll>
      <Pagination links={categories.links} filter={filterRef.current?.value ?? ''}  />
      </div>
    </AppLayout>
  );
}
