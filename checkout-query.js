import { gql } from 'apollo-boost'

export const checkout = gql`
  fragment VariantFragment on ProductVariant {
    id
    title
    price
    priceV2 {
      amount
      currencyCode
    }
    presentmentPrices(first: 20) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          price {
            amount
            currencyCode
          }
        }
      }
    }
    weight
    available: availableForSale
    sku
    compareAtPrice
    compareAtPriceV2 {
      amount
      currencyCode
    }
    image {
      id
      src: originalSrc
      altText
    }
    selectedOptions {
      name
      value
    }
  }
`

export const checkout2 = gql`
  fragment DiscountApplicationFragment on DiscountApplication {
    __typename
    targetSelection
    allocationMethod
    targetType
    value {
      ... on MoneyV2 {
        amount
        currencyCode
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
    ... on ManualDiscountApplication {
      title
      description
    }
    ... on DiscountCodeApplication {
      code
      applicable
    }
    ... on ScriptDiscountApplication {
      description
    }
    ... on AutomaticDiscountApplication {
      title
    }
  }
`

export const checkout3 = gql`
  fragment AppliedGiftCardFragment on AppliedGiftCard {
    amountUsedV2 {
      amount
      currencyCode
    }
    balanceV2 {
      amount
      currencyCode
    }
    presentmentAmountUsed {
      amount
      currencyCode
    }
    id
    lastCharacters
  }
`

export const checkout4 = gql`
  fragment VariantWithProductFragment on ProductVariant {
    ...VariantFragment
    product {
      id
      handle
    }
  }
`

export const checkout5 = gql`
  fragment UserErrorFragment on UserError {
    field
    message
  }
`
export const checkout6 = gql`
  fragment CheckoutUserErrorFragment on CheckoutUserError {
    field
    message
    code
  }
`
export const checkout7 = gql`
  fragment MailingAddressFragment on MailingAddress {
    id
    address1
    address2
    city
    company
    country
    firstName
    formatted
    lastName
    latitude
    longitude
    phone
    province
    zip
    name
    countryCode: countryCodeV2
    provinceCode
  }
`
export const checkout8 = gql`
  fragment CheckoutFragment on Checkout {
    id
    ready
    requiresShipping
    note
    paymentDue
    paymentDueV2 {
      amount
      currencyCode
    }
    webUrl
    orderStatusUrl
    taxExempt
    taxesIncluded
    currencyCode
    totalTax
    totalTaxV2 {
      amount
      currencyCode
    }
    lineItemsSubtotalPrice {
      amount
      currencyCode
    }
    subtotalPrice
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalPrice
    totalPriceV2 {
      amount
      currencyCode
    }
    completedAt
    createdAt
    updatedAt
    email
    discountApplications(first: 10) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          __typename
          ...DiscountApplicationFragment
        }
      }
    }
    appliedGiftCards {
      ...AppliedGiftCardFragment
    }
    shippingAddress {
      ...MailingAddressFragment
    }
    shippingLine {
      handle
      price
      priceV2 {
        amount
        currencyCode
      }
      title
    }
    customAttributes {
      key
      value
    }
    order {
      id
      processedAt
      orderNumber
      subtotalPrice
      subtotalPriceV2 {
        amount
        currencyCode
      }
      totalShippingPrice
      totalShippingPriceV2 {
        amount
        currencyCode
      }
      totalTax
      totalTaxV2 {
        amount
        currencyCode
      }
      totalPrice
      totalPriceV2 {
        amount
        currencyCode
      }
      currencyCode
      totalRefunded
      totalRefundedV2 {
        amount
        currencyCode
      }
      customerUrl
      shippingAddress {
        ...MailingAddressFragment
      }

      lineItems(first: 250) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            title
            variant {
              ...VariantWithProductFragment
            }
            quantity
            customAttributes {
              key
              value
            }
          }
        }
      }
    }

    lineItems(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          variant {
            ...VariantWithProductFragment
          }
          quantity
          customAttributes {
            key
            value
          }
          discountAllocations {
            allocatedAmount {
              amount
              currencyCode
            }
            discountApplication {
              __typename
              ...DiscountApplicationFragment
            }
          }
        }
      }
    }
  }
`
export const checkout9 = gql`
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(
      checkoutId: $checkoutId
      lineItems: $lineItems
    ) {
      userErrors {
        ...UserErrorFragment
      }
      checkoutUserErrors {
        ...CheckoutUserErrorFragment
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
`
