import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react"
import type { FC } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

interface PaginationCompProps {
    totalPage: number;
    total: number;
    onPageChange: (page: number) => void;
}

const PaginationComp: FC<PaginationCompProps> = ({ totalPage, total, onPageChange }) => {
  return (
    <Pagination.Root count={total} pageSize={1} defaultPage={totalPage}>
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton
            onClick={() => onPageChange(totalPage - 1)}
            disabled={totalPage === 1}
          >
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton 
              variant={{ base: "ghost", _selected: "outline" }}
              onClick={() => onPageChange(page.value)}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton
            onClick={() => onPageChange(totalPage + 1)}
            disabled={totalPage === total}
          >
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

export default PaginationComp;
