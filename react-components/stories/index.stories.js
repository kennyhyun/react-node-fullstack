import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { ProductCard, ProductGrid, ListHeader, ListFooter } from '../components';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('ProductCard', module)
  .add('default', () => <>
    <ProductCard
      title="Pilot product"
      image="https://imgplaceholder.com/640x360"
      description="A pilot product for test very long long long long long long long long long long long long long description"
      price="$16.99"
    />
    <div>.</div>
    <ProductCard description="single line"/>
    <div>.</div>
    <ProductCard />
  </>)
;

storiesOf('ProductGrid', module)
  .add('default', () => <ProductGrid
    items={Array(28).fill(null).map((_, i) => ({
      name: `title ${i}`,
      description: `description ${i}`,
      price: `$${i}`,
      image: "https://imgplaceholder.com/640x360",
    }))}
  />)
;

storiesOf('ListHeader', module)
  .add('default', () => <ListHeader
    confirmItemsPerPage={action('confirmed')}
    totalItems={102456783}
  />)
;

storiesOf('ListFooter', module)
  .add('default', () => {
    return <>
      <ListFooter
        confirmPage={action('confirmed')}
        totalItems={10}
      />
      <ListFooter
        confirmPage={action('confirmed')}
        totalItems={48}
        page={3}
      />
      <ListFooter
        confirmPage={action('confirmed')}
        totalItems={1000}
        page={23}
      />
    </>
  })
;

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
