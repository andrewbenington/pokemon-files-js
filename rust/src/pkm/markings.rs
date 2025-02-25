use serde::Serialize;

#[derive(Debug, Default, Serialize, Clone, Copy)]
pub struct MarkingsFourShapes {
    pub circle: bool,
    pub square: bool,
    pub triangle: bool,
    pub heart: bool,
}

#[derive(Debug, Default, Serialize, Clone, Copy)]
pub struct MarkingsSixShapes {
    pub circle: bool,
    pub square: bool,
    pub triangle: bool,
    pub heart: bool,
    pub star: bool,
    pub diamond: bool,
}

#[derive(Debug, Default, Serialize, Clone, Copy)]
pub enum MarkingValue {
    #[default]
    Unset,
    Blue,
    Red,
}

#[derive(Debug, Default, Serialize, Clone, Copy)]
pub struct MarkingsSixShapesWithColor {
    pub circle: MarkingValue,
    pub square: MarkingValue,
    pub triangle: MarkingValue,
    pub heart: MarkingValue,
    pub star: MarkingValue,
    pub diamond: MarkingValue,
}

pub enum Markings {
    FourShapes(MarkingsFourShapes),
    SixShapes(MarkingsSixShapes),
    SixShapesWithColor(MarkingsSixShapesWithColor),
}
