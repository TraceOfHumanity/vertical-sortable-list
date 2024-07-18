import UserItem from "./user-item";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {useAppDispatch, useAppSelector} from "../hooks/useReduxToolkit";
import {setSortingArr} from "../redux/slices/data";

type User = {
  id: number;
  name: string;
  email: string;
};
// const dummyData: User[] = [
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'john@example.com',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//   },
//   {
//     id: 3,
//     name: 'Alice Johnson',
//     email: 'alice@example.com',
//   },
// ];

const UserList = () => {
  const dispatch = useAppDispatch();
  // const [userList, setUserList] = useState<User[]>(dummyData);
  const {userArr} = useAppSelector((state) => state.sorting);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortList = (items, active, over) => {
    const oldIndex = items.findIndex((item: User) => item.id === active.id);
    const newIndex = items.findIndex((item: User) => item.id === over.id);

    return arrayMove(items, oldIndex, newIndex);
  };

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      const sortedForm = sortList(userArr, active, over);
      dispatch(setSortingArr(sortedForm));

      // setUserList((items) => {
      //   const oldIndex = items.findIndex((item) => item.id === active.id);
      //   const newIndex = items.findIndex((item) => item.id === over.id);
      //   return arrayMove(items, oldIndex, newIndex);
      // });
    }
  }
  console.log(userArr);

  return (
    <div className="max-w-2xl mx-auto grid gap-2 my-10">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={userArr} strategy={verticalListSortingStrategy}>
          {userArr.map((user: User) => (
            <UserItem key={user.id} user={user} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default UserList;
