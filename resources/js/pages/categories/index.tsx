import AppLayout from '@/layouts/app-layout';
import { Head, usePage, InfiniteScroll, router } from '@inertiajs/react';
import { create, edit, destroy } from '@/actions/App/Http/Controllers/CategoryController';
import { type BreadcrumbItem, Link, FlashMessages } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import toast from '../../lib/toasts';
import Search from '@/components/search';
import Pagination from '@/components/pagination';
import { useDebouncedCallback } from 'use-debounce';
import generatePagination from '@/lib/generate-pagination';

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

interface PaginatedCategories {
  data: Category[],
  links: Link[]
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
  
  const { url } = usePage();
  const searchParams = new URLSearchParams(url.split('?')[1]);
  const filter = searchParams.get('filter');

  const deleteCategory = (id: number) => {
    toast.action(
      'Are you sure?',
      () => { router.delete(destroy(id)) },
      'The category cannot be recovered'
    )
  }

  const fetchWithFilter = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;
    router.get(
      '/categories',
      filter ? { filter } : {},
      {
        reset: ['categories'],
        only: ['categories'],
        preserveState: true,
      }
    )
  }, 800);

  // const handleNavigation = (
  //   link: Link,
  //   filter?: string | null
  // ) => {

  //   if (!link.url || link.active) return

  //   router.get(
  //     url,
  //     filter ? { filter } : {},
  //     { preserveState: true }
  //   );
  // }

  console.log(filter);
  console.log(searchParams.get('filter'));

  const getValidData = (object: object) => {
    // const entries = Object.entries(object);
    // console.log("entries", entries);

    // const filteredEntries = entries.filter(([, value]) => {
    //   if (value !== null) {
    //     console.log("value", value);
    //     return true;
    //   }
    // });

    // console.log("filtered", filteredEntries);
    

    // const query = Object.fromEntries(filteredEntries);
    // return query;
    
    return Object.fromEntries(
      Object.entries(object)
      .filter(([, value]) => value !== null || value !== undefined)
    );
  }

  const handleNavigation = (
    link: Link,
    query?: object
  ) => {

    if (!link.url || link.active) return
    const data = getValidData({...query});

    router.get(
      link.url,
      data,
      { preserveState: true }
    );
  }

  const links = generatePagination(categories.links);
  
  links.forEach(link => {
    // console.log(filter);
    
    if (link) {
      link.click = () => handleNavigation(link, filter ? { filter: filter} : {})
    }
  })
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categories" />
      <div className="flex flex-col h-full gap-4 rounded-xl p-5">

      <div className='flex gap-5'>
        <Search 
          onChange={fetchWithFilter}
          defaultValue={filter ?? ''}
          type='search' />
        <Button 
          className='w-fit text-base'
          onClick={() => router.visit(create())}
        >
          New category
        </Button>
      </div>
  
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
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Pagination
                    links={links}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
      </InfiniteScroll>
      </div>
    </AppLayout>
  );
}
