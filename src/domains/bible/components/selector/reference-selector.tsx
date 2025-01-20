import { ChevronDown } from "lucide-react";
import { Button } from "@/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/components/popover";

function ReferenceSelectorButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="gap-2 font-bold" variant="text" color="black">
          Genesis 2
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-0">
        <ReferenceSelector />
      </PopoverContent>
    </Popover>
  );
}

function ReferenceSelector() {
  return (
    <div className="flex">
      <div className="flex w-80 flex-col">
        <div className="flex items-center justify-center border border-input bg-zinc-100 py-1">
          Book
        </div>
        <div className="h-40 border border-input">Lots of bible books</div>
      </div>
      <div className="flex w-40 flex-col">
        <div className="flex items-center justify-center border border-input bg-zinc-100 py-1">
          Chapter
        </div>
        <div className="h-40 border border-input">Lots of chapters</div>
      </div>
      <div className="flex w-40 flex-col">
        <div className="flex items-center justify-center border border-input bg-zinc-100 py-1">
          Verse
        </div>
        <div className="h-40 border border-input">Lots of verses</div>
      </div>
    </div>
    // <Box display="flex">
    //   <Box width={308} className={styles.section}>
    //     <Box ml="-1px" className={styles.header}>
    //       <Typography variant="body2" color="textSecondary">
    //         <FormattedMessage id="tab.bible.verse_select.book" />
    //       </Typography>
    //     </Box>
    //     <Box className={styles.scrollable}>{bookGrid}</Box>
    //   </Box>
    //   <Box
    //     ml="-3px"
    //     width={160}
    //     className={styles.section}
    //     borderLeft={`3px solid ${theme.palette.grey[300]}`}
    //   >
    //     <Box ml="-1px" className={styles.header}>
    //       <Typography variant="body2" color="textSecondary">
    //         <FormattedMessage id="tab.bible.verse_select.chapter" />
    //       </Typography>
    //     </Box>
    //     <Box className={styles.scrollable}>{chapterGrid}</Box>
    //   </Box>
    //   <Box
    //     width={160}
    //     className={styles.section}
    //     mr="-2px"
    //     ml="-2px"
    //     borderLeft={`3px solid ${theme.palette.grey[300]}`}
    //   >
    //     <Box ml="-1px" mr="2px" className={styles.header}>
    //       <Typography variant="body2" color="textSecondary">
    //         <FormattedMessage id="tab.bible.verse_select.verses" />
    //       </Typography>
    //     </Box>
    //     <Box className={styles.scrollable}>{verseGrid}</Box>
    //   </Box>
    // </Box>
  );
}

export { ReferenceSelectorButton };
