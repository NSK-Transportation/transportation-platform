import { logoNoText } from "@/shared/assets";
import { Image, Stacks, Typography } from "@/shared/ui";

const divStyle = {
    width: '180vh',
    height: '100vh',
    backgroundColor: '#2196F3',
    backgroundSize: 'cover',
};

export const InternalError = () => {
    return <Stacks gap={150} style={divStyle} direction="column" fullwidth={true} fullheight={true} alignItems="center" justifyContent="start">
        <Image objectFit="contain" alt={"logoNoText"} src={logoNoText} style={{ marginTop: "100px", width: "100px", height: "100px" }} />
        <Stacks direction="column" fullwidth={true} alignItems="center" justifyContent="end">
            <Typography size={90} variant="h1" color="default-white" weight={1000}>500</Typography>
            <Typography size={50} variant="h1" color="default-white" weight={1000}>Ошибка на сервере(</Typography>
            <Stacks gap={250} direction="row" fullwidth={true} alignItems="center" justifyContent="center">
                <Typography size={30} variant="h2" color="default-white" weight={200}> </Typography>
                <Typography size={30} variant="h2" color="default-white" weight={200}>Скоро починим...</Typography>
            </Stacks>
        </Stacks>
    </Stacks>

};
