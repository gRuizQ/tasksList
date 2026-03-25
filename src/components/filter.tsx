import { Badge } from "@/src/components/ui/badge";
import { ListPlus, List, Check } from "lucide-react";

export type FilterType = "all" | "pending" | "completed";

type FilterProps = {
    currentFilter: FilterType;
    setCurrentFilter: (filter: FilterType) => void;
}

const Filter = ({ currentFilter, setCurrentFilter }: FilterProps) => {
    return (
        <div className="flex gap-2">

            <Badge className="cursor-pointer"
                variant={`${currentFilter === 'all' ? "default" : "outline"}`}
                onClick={() => setCurrentFilter('all')}>
                <ListPlus /> All
            </Badge>

            <Badge className="cursor-pointer"
                variant={`${currentFilter === 'pending' ? "default" : "outline"}`}
                onClick={() => setCurrentFilter('pending')}>
                <List /> To-Do
            </Badge>

            <Badge className="cursor-pointer"
                variant={`${currentFilter === 'completed' ? "default" : "outline"}`}
                onClick={() => setCurrentFilter('completed')}>
                <Check /> Finished
            </Badge>

        </div>
    );
};

export default Filter;